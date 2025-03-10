'use client';

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import ComponentPickerMenuPlugin from "./plugins/ComponentPickerPlugin";
import DayContainerPlugin from "./plugins/DayContainerPlugin";
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
              <ContentEditable className="h-full overflow-y-scroll w-full text-lg focus:outline-none p-8" />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CollapsiblePlugin userID={userID} />
      <TransformCategoryPlugin userID={userID} />
      <DayContainerPlugin />
      <OnDayEntryChangePlugin userID={userID} />
      <CodeHighlightPlugin />
      <ComponentPickerPlugin />
      <ComponentPickerMenuPlugin />
      <PromptNodePlugin />

      {showTreeView && <TreeViewPlugin />}
    </div>
  )
};

export default Editor;

