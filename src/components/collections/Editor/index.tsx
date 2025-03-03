'use client';

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import DayContainerPlugin from "./plugins/DayContainerPlugin";
import OnDayEntryChangePlugin from "./plugins/OnDayEntryChangePlugin";
import TransformCategoryPlugin from "./plugins/TransformCategoryPlugin";

type Props = {
  userID: string;
}

const Editor = ({ userID }: Props): React.ReactElement => {

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
    </div>
  )
};

export default Editor;

