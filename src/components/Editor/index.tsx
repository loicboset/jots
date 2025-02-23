'use client';

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CollapsibleContainerNode } from "./nodes/CollapsibleContainerNode";
import { CollapsibleContentNode } from "./nodes/CollapsibleContentNode";
import { CollapsibleTitleNode } from "./nodes/CollapsibleTitleNode";
import { DayContainerNode } from "./nodes/DayContainerNode";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import DayContainerPlugin from "./plugins/DayContainerPlugin";
import TransformCategoryPlugin from "./plugins/TransformCategoryPlugin";
import { DayTitleNode } from "./nodes/DayTitleNode";
import { DayContentNode } from "./nodes/DayContentNode";
import OnDayEntryChangePlugin from "./plugins/OnDayEntryChangePlugin";
import { useJournalEntries } from "@/services/journal_entries";

type Props = {
  userID: string;
}

const Editor = ({ userID }: Props) => {
  // RQ
  const { data: entries = [], isLoading } = useJournalEntries();

  if (isLoading) return <p className="p-8 text-lg">Loading...</p>

  // METHODS
  const onError = (error: Error) => {
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
    nodes: [
      CollapsibleContainerNode,
      CollapsibleTitleNode,
      CollapsibleContentNode,
      DayContainerNode,
      DayTitleNode,
      DayContentNode,
    ],
    onError,
  };


  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-full focus:outline-none">
        <RichTextPlugin
          contentEditable={
            <div className="h-full">
              <div className="h-full w-full relative focus:outline-none">
                <ContentEditable className="h-full w-full text-lg focus:outline-none p-8" />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CollapsiblePlugin />
        <TransformCategoryPlugin />
        <DayContainerPlugin />
        <OnDayEntryChangePlugin userID={userID} />
      </div>
    </LexicalComposer>
  )
};

export default Editor;

