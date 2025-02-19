'use client';

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { CustomParagraphNode } from "./nodes/CustomParagraphNode";
import { CollapsibleContainerNode } from "./plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleTitleNode } from "./plugins/CollapsiblePlugin/CollapsibleTitleNode";
import { CollapsibleContentNode } from "./plugins/CollapsiblePlugin/CollapsibleContentNode";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import TransformCategoryPlugin from "./plugins/TransformCategoryPlugin";
import { ParagraphNode } from "lexical";


const Editor = () => {
  // METHODS
  function onError(error: Error) {
    console.error(error);
  }

  // VARS
  const initialConfig = {
    namespace: 'MyEditor',
    nodes: [
      CollapsibleContainerNode,
      CollapsibleTitleNode,
      CollapsibleContentNode,
      CustomParagraphNode,
      {
        replace: ParagraphNode,
        with: () => {
          return new CustomParagraphNode();
        },
        withKlass: CustomParagraphNode,
      }
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
      </div>
    </LexicalComposer>
  )
};

export default Editor;

