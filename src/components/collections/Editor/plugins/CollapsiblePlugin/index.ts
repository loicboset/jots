import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DELETE_CHARACTER_COMMAND,
  ElementNode,
  INSERT_PARAGRAPH_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  LexicalNode,
} from "lexical";

import {
  CollapsibleContentNode,
  $isCollapsibleContentNode,
} from "@/components/collections/Editor/nodes/CollapsibleContentNode";
import { useCategories, useUpsertCategory } from "@/services/categories";
import randomColor from "@/utils/color/randomColor";

import { CollapsibleContainerNode, $isCollapsibleContainerNode } from "../../nodes/CollapsibleContainerNode";
import { CollapsibleTitleNode, $isCollapsibleTitleNode } from "../../nodes/CollapsibleTitleNode";
import "./Collapsible.css";
import { $isDayContainerNode, DayContainerNode } from "../../nodes/DayContainerNode";
import { $isDayContentNode } from "../../nodes/DayContentNode";

export const INSERT_COLLAPSIBLE_COMMAND = createCommand<void>();
export const FILTER_CATEGORY_COMMAND = createCommand<string>();
export const SHOW_ALL_CATEGORIES_COMMAND = createCommand<null>();

type Props = {
  userID: string;
};

export default function CollapsiblePlugin({ userID }: Props): null {
  // RQ
  const { data: categories = [], isLoading } = useCategories(userID);
  const { mutate: upsertCategory } = useUpsertCategory();

  // HOOKS
  const [editor] = useLexicalComposerContext();

  // EFFECTS
  useEffect(() => {
    const remove = editor.registerCommand(
      FILTER_CATEGORY_COMMAND,
      (categoryName: string | null): boolean => {
        editor.update((): void => {
          const editorState = editor.getEditorState();
          const nodes = editorState._nodeMap;
          const dayContainers = new Map<string, DayContainerNode>();

          nodes.forEach((node) => {
            if (!$isCollapsibleContainerNode(node)) return;
            const contentNode = node.getParent();
            const dayContainerNode = contentNode?.getParent();
            if ($isDayContainerNode(dayContainerNode)) {
              dayContainers.set(dayContainerNode.__date, dayContainerNode);
            }

            if (node.__name === categoryName) {
              node.setOpen(true);
            } else {
              node.setOpen(false);
            }
          });

          dayContainers.forEach((node) => {
            const contentNode = node.getChildren().find((child) => $isDayContentNode(child));
            if (!contentNode) return;

            let shouldCollapseDay = true;
            contentNode.getChildren().forEach((_node) => {
              if (!$isCollapsibleContainerNode(_node)) return;
              if (_node.__name === categoryName) {
                shouldCollapseDay = false;
              }
            });
            if (shouldCollapseDay) {
              node.setOpen(false);
            } else {
              node.setOpen(true);
            }
          });
        });
        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    return (): void => {
      remove();
    };
  }, [editor]);

  useEffect(() => {
    const remove = editor.registerCommand(
      SHOW_ALL_CATEGORIES_COMMAND,
      (): boolean => {
        editor.update((): void => {
          const editorState = editor.getEditorState();
          const nodes = editorState._nodeMap;
          nodes.forEach((node) => {
            const contentNode = node.getParent();
            const dayContainerNode = contentNode?.getParent();
            if ($isDayContainerNode(dayContainerNode)) {
              dayContainerNode.setOpen(true);
            }

            if ($isCollapsibleContainerNode(node)) {
              node.setOpen(true);
            }
          });
        });
        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    return (): void => {
      remove();
    };
  }, [editor]);

  useEffect(() => {
    if (isLoading) return;

    const remove = editor.registerNodeTransform(CollapsibleTitleNode, (node) => {
      const parentNode = node.getParent();
      if (!$isCollapsibleContainerNode(parentNode)) return;

      const categoryName = parentNode.__name;
      if (!categoryName) return;

      const existingCategory = categories.find((category) => category.name === categoryName);
      if (existingCategory) {
        editor.getEditorState().read(() => {
          const dom = editor.getElementByKey(parentNode.getKey());
          parentNode.setColor(dom, existingCategory.color);
        });
      } else {
        const color = randomColor();
        upsertCategory({ name: categoryName, user_id: userID, color });
        const dom = editor.getElementByKey(parentNode.getKey());
        parentNode.setColor(dom, color);
      }
    });

    return (): void => {
      remove();
    };
  }, [categories, editor, isLoading, upsertCategory, userID]);

  useEffect(() => {
    if (!editor.hasNodes([CollapsibleContainerNode, CollapsibleTitleNode, CollapsibleContentNode])) {
      throw new Error(
        // eslint-disable-next-line max-len
        "CollapsiblePlugin: CollapsibleContainerNode, CollapsibleTitleNode, or CollapsibleContentNode not registered on editor"
      );
    }

    const $onEscapeUp = (): boolean => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) && selection.isCollapsed() && selection.anchor.offset === 0) {
        const container = $findMatchingParent(selection.anchor.getNode(), $isCollapsibleContainerNode);

        if ($isCollapsibleContainerNode(container)) {
          const parent = container.getParent<ElementNode>();
          if (
            parent !== null &&
            parent.getFirstChild<LexicalNode>() === container &&
            selection.anchor.key === container.getFirstDescendant<LexicalNode>()?.getKey()
          ) {
            container.insertBefore($createParagraphNode());
          }
        }
      }

      return false;
    };

    const $onEscapeDown = (): boolean => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) && selection.isCollapsed()) {
        const container = $findMatchingParent(selection.anchor.getNode(), $isCollapsibleContainerNode);

        if ($isCollapsibleContainerNode(container)) {
          const parent = container.getParent<ElementNode>();
          if (parent !== null && parent.getLastChild<LexicalNode>() === container) {
            const titleParagraph = container.getFirstDescendant<LexicalNode>();
            const contentParagraph = container.getLastDescendant<LexicalNode>();

            if (
              (contentParagraph !== null &&
                selection.anchor.key === contentParagraph.getKey() &&
                selection.anchor.offset === contentParagraph.getTextContentSize()) ||
              (titleParagraph !== null &&
                selection.anchor.key === titleParagraph.getKey() &&
                selection.anchor.offset === titleParagraph.getTextContentSize())
            ) {
              container.insertAfter($createParagraphNode());
            }
          }
        }
      }

      return false;
    };

    return mergeRegister(
      // Structure enforcing transformers for each node type. In case nesting structure is not
      // "Container > Title + Content" it'll unwrap nodes and convert it back
      // to regular content.
      editor.registerNodeTransform(CollapsibleContentNode, (node) => {
        const parent = node.getParent<ElementNode>();
        if (!$isCollapsibleContainerNode(parent)) {
          const children = node.getChildren<LexicalNode>();
          for (const child of children) {
            node.insertBefore(child);
          }
          node.remove();
        }
      }),

      editor.registerNodeTransform(CollapsibleTitleNode, (node) => {
        const parent = node.getParent<ElementNode>();
        if (!$isCollapsibleContainerNode(parent)) {
          node.replace($createParagraphNode().append(...node.getChildren<LexicalNode>()));
          return;
        }
      }),

      editor.registerNodeTransform(CollapsibleContainerNode, (node) => {
        const children = node.getChildren<LexicalNode>();
        if (children.length !== 2 || !$isCollapsibleTitleNode(children[0]) || !$isCollapsibleContentNode(children[1])) {
          for (const child of children) {
            node.insertBefore(child);
          }
          node.remove();
        }
      }),

      // This handles the case when container is collapsed and we delete its previous sibling
      // into it, it would cause collapsed content deleted (since it's display: none, and selection
      // swallows it when deletes single char). Instead we expand container, which is although
      // not perfect, but avoids bigger problem
      editor.registerCommand(
        DELETE_CHARACTER_COMMAND,
        () => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection) || !selection.isCollapsed() || selection.anchor.offset !== 0) {
            return false;
          }

          const anchorNode = selection.anchor.getNode();
          const topLevelElement = anchorNode.getTopLevelElement();
          if (topLevelElement === null) {
            return false;
          }

          const container = topLevelElement.getPreviousSibling<LexicalNode>();
          if (!$isCollapsibleContainerNode(container) || container.getOpen()) {
            return false;
          }

          container.setOpen(true);
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),

      // When collapsible is the last child pressing down/right arrow will insert paragraph
      // below it to allow adding more content. It's similar what $insertBlockNode
      // (mainly for decorators), except it'll always be possible to continue adding
      // new content even if trailing paragraph is accidentally deleted
      editor.registerCommand(KEY_ARROW_DOWN_COMMAND, $onEscapeDown, COMMAND_PRIORITY_LOW),

      editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, $onEscapeDown, COMMAND_PRIORITY_LOW),

      // When collapsible is the first child pressing up/left arrow will insert paragraph
      // above it to allow adding more content. It's similar what $insertBlockNode
      // (mainly for decorators), except it'll always be possible to continue adding
      // new content even if leading paragraph is accidentally deleted
      editor.registerCommand(KEY_ARROW_UP_COMMAND, $onEscapeUp, COMMAND_PRIORITY_LOW),

      editor.registerCommand(KEY_ARROW_LEFT_COMMAND, $onEscapeUp, COMMAND_PRIORITY_LOW),

      // Enter goes from Title to Content rather than a new line inside Title
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const titleNode = $findMatchingParent(selection.anchor.getNode(), (node) => $isCollapsibleTitleNode(node));

            if ($isCollapsibleTitleNode(titleNode)) {
              const container = titleNode.getParent<ElementNode>();
              if (container && $isCollapsibleContainerNode(container)) {
                if (!container.getOpen()) {
                  container.toggleOpen();
                }
                titleNode.getNextSibling()?.selectEnd();
                return true;
              }
            }
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);

  return null;
}
