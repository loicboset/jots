'use client';

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { EditorState, ParagraphNode } from "lexical";
import { CollapsibleContainerNode } from "./nodes/CollapsibleContainerNode";
import { CollapsibleContentNode } from "./nodes/CollapsibleContentNode";
import { CollapsibleTitleNode } from "./nodes/CollapsibleTitleNode";
import { CustomParagraphNode } from "./nodes/CustomParagraphNode";
import { DayContainerNode } from "./nodes/DayContainerNode";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import DayContainerPlugin from "./plugins/DayContainerPlugin";
import TransformCategoryPlugin from "./plugins/TransformCategoryPlugin";
import { DayTitleNode } from "./nodes/DayTitleNode";
import { DayContentNode } from "./nodes/DayContentNode";

const Editor = () => {
  // METHODS
  const onError = (error: Error) => {
    console.error(error);
  }

  const onChange = (editorState: EditorState) => {
    console.log(editorState.toJSON());
  };

  // VARS
  const initialConfig = {
    namespace: 'MyEditor',
    nodes: [
      CollapsibleContainerNode,
      CollapsibleTitleNode,
      CollapsibleContentNode,
      CustomParagraphNode,
      DayContainerNode,
      DayTitleNode,
      DayContentNode,
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
        <DayContainerPlugin />
        <OnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  )
};

export default Editor;

