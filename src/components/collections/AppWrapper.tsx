import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import { useJournalEntries } from "@/services/journal_entries";

import { AiPromptNode } from "./Editor/nodes/AiPromptNode";
import { CollapsibleContainerNode } from "./Editor/nodes/CollapsibleContainerNode";
import { CollapsibleContentNode } from "./Editor/nodes/CollapsibleContentNode";
import { CollapsibleTitleNode } from "./Editor/nodes/CollapsibleTitleNode";
import { DayContainerNode } from "./Editor/nodes/DayContainerNode";
import { DayContentNode } from "./Editor/nodes/DayContentNode";
import { DayTitleNode } from "./Editor/nodes/DayTitleNode";
import { PromptNode } from "./Editor/nodes/PromptNode";

type Props = {
  children: React.ReactNode;
  userID: string;
};

const AppWrapper = ({ children, userID }: Props): React.ReactElement => {
  // RQ
  const { data: entries = [], isLoading } = useJournalEntries(userID);

  if (isLoading) return <p className="p-8 text-lg">Loading...</p>


  // METHODS
  const onError = (error: Error): void => {
    console.error(error);
  }

  // VARS
  const root = {
    root: {
      children: entries.map((entry) => JSON.parse(entry.content)),
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1
    }
  }

  const initialConfig = {
    editorState: entries.length > 0 ? JSON.stringify(root) : null,
    namespace: 'MyEditor',
    theme: {
      link: 'editor_link',
      list: {
        checklist: 'editor_checklist',
        listitem: 'editor_listItem',
        listitemChecked: 'editor_listItemChecked',
        listitemUnchecked: 'editor_listItemUnchecked',
        nested: {
          listitem: 'editor_nestedListItem',
        },
        olDepth: [
          'editor_ol1',
          'editor_ol2',
          'editor_ol3',
          'editor_ol4',
          'editor_ol5',
        ],
        ul: 'editor_ul',
      },
    },
    nodes: [
      CollapsibleContainerNode,
      CollapsibleTitleNode,
      CollapsibleContentNode,
      DayContainerNode,
      DayTitleNode,
      DayContentNode,
      CodeNode,
      CodeHighlightNode,
      PromptNode,
      AiPromptNode,
      AutoLinkNode,
      LinkNode,
      HorizontalRuleNode,
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode
    ],
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {children}
    </LexicalComposer >

  );
};

export default AppWrapper;
