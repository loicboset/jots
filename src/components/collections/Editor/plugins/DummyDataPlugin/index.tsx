/* eslint-disable max-len */
import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, TextNode } from "lexical";

import { useJournalEntries } from "@/services/journal_entries";

import { $createCollapsibleContainerNode } from "../../nodes/CollapsibleContainerNode";
import { $createCollapsibleContentNode } from "../../nodes/CollapsibleContentNode";
import { $createCollapsibleTitleNode } from "../../nodes/CollapsibleTitleNode";
import { $isDayContainerNode } from "../../nodes/DayContainerNode";
import { $isPromptNode } from "../../nodes/PromptNode";

const DummyDataPlugin = (): null => {
  // RQ
  const { data: entries = [], isLoading } = useJournalEntries();

  // HOOKS
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (isLoading || entries.length > 0) return;

    editor.update(() => {
      const editorState = editor.getEditorState();
      const nodes = editorState._nodeMap;
      nodes.forEach((node) => {
        const isDayContainer = $isDayContainerNode(node);

        if (!isDayContainer) return;

        const last = node.getLastDescendant()
        const isPromptNode = $isPromptNode(last)
        if (!isPromptNode) return;

        const spacingParagraph = $createParagraphNode();
        last.getParent()?.insertAfter(spacingParagraph)

        // Welcome!
        const welcome = $createParagraphNode();
        welcome.append(new TextNode('Welcome to Jots! 🎉'),)
        spacingParagraph.insertAfter(welcome)
        const sub = $createParagraphNode()
        sub.append(new TextNode('You’re taking your first step toward building a powerful habit—journaling your dev journey. This practice will help you gain clarity, track progress, and reflect on your growth.'));
        welcome.insertAfter(sub)
        sub.insertBefore($createParagraphNode())

        // Get started
        const getStarted = $createParagraphNode();
        getStarted.append(new TextNode('Here’s how to get started:'))
        sub.insertAfter(getStarted)
        getStarted.insertBefore($createParagraphNode())

        // The editor
        const editorTitle = $createParagraphNode().append(new TextNode('📝 The Editor'));
        const editor = $createParagraphNode();
        editor.append(new TextNode('This is where you’ll write. No strict format—just an automatic date to help you track entries. Organise your thoughts however you like.'))
        getStarted.insertAfter(editorTitle)
        editorTitle.insertAfter(editor)
        editorTitle.insertBefore($createParagraphNode())

        // Features
        const features = $createParagraphNode();
        features.append(new TextNode('⚡ Two tools to enhance your journaling:'))

        const prompt = $createParagraphNode();
        prompt.append(new TextNode('- /prompt – Get writing inspiration with guided prompts'))

        const categories = $createParagraphNode();
        categories.append(new TextNode('- #category_name – Tag and organise your notes. Example:'))

        const categoryNode = $createCollapsibleContainerNode(true, 'learnings', 'f123123');

        const titleNode = $createCollapsibleTitleNode();
        const paragraph = $createParagraphNode();
        titleNode.append(paragraph);
        const textNode = new TextNode('#learnings');
        paragraph.append(textNode);

        const contentNode = $createCollapsibleContentNode();
        const contentParagraph = $createParagraphNode();
        const fact = $createParagraphNode()
        fact.append(new TextNode('- journaling improves clarity & focus, strengthens self-reflection, and cultivates emotional intelligence'))
        contentParagraph.append(fact)

        contentNode.append(contentParagraph);
        categoryNode.append(titleNode, contentNode)

        editor.insertAfter(features)
        features.insertAfter(prompt)
        prompt.insertAfter(categories)
        categories.insertAfter($createParagraphNode())
        categories.insertAfter(categoryNode)
        categoryNode.insertBefore($createParagraphNode())
        features.insertBefore($createParagraphNode())


        // Enjoy
        const enjoy = $createParagraphNode();
        enjoy.append(new TextNode('This is just the beginning—enjoy the journey! 🚀'))
        categoryNode.insertAfter(enjoy)
        enjoy.insertBefore($createParagraphNode())
      })
    })
  }, [editor, entries.length, isLoading]);


  return null;
};

export default DummyDataPlugin;
