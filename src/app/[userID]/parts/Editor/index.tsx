'use client';

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";

const Editor = () => {
  // STATE
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  // METHODS
  function onError(error: Error) {
    console.error(error);
  }

  // VARS
  const initialConfig = {
    namespace: 'MyEditor',
    onError,
  };

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-full p-8 focus:outline-none">
        <RichTextPlugin
          contentEditable={
            <div className="h-full">
              <div className="h-full w-full relative focus:outline-none" ref={onRef}>
                <ContentEditable className="h-full w-full text-xl focus:outline-none p-8" />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {floatingAnchorElem && (
          <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        )}
      </div>
    </LexicalComposer>
  );
};

export default Editor;