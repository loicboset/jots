'use client';

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import AiPromptNodePlugin from "./plugins/AiPromptNodePlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import ComponentPickerMenuPlugin from "./plugins/ComponentPickerPlugin";
import DayContainerPlugin from "./plugins/DayContainerPlugin";
import DummyDataPlugin from "./plugins/DummyDataPlugin";
import OnDayEntryChangePlugin from "./plugins/OnDayEntryChangePlugin";
import PromptNodePlugin from "./plugins/PromptNodePlugin";
import TransformCategoryPlugin from "./plugins/TransformCategoryPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

type Props = {
  userID: string;
}

const Editor = ({ userID }: Props): React.ReactElement => {
  // VARS
  const showTreeView = process.env.NODE_ENV === "development";

  return (
    <div className="w-full focus:outline-none">
      <RichTextPlugin
        contentEditable={
          <div className="h-full">
            <div className="h-full w-full relative focus:outline-none">
              <ContentEditable className="h-full overflow-y-scroll w-full focus:outline-none p-8" />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <AiPromptNodePlugin userID={userID} />
      <CollapsiblePlugin userID={userID} />
      <TransformCategoryPlugin userID={userID} />
      <DayContainerPlugin />
      <OnDayEntryChangePlugin userID={userID} />
      <CodeHighlightPlugin />
      <ComponentPickerPlugin />
      <ComponentPickerMenuPlugin />
      <PromptNodePlugin />
      <DummyDataPlugin userID={userID} />
      <HistoryPlugin />

      {showTreeView && <TreeViewPlugin />}
    </div>
  )
};

export default Editor;

