'use client';

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { EditorState } from "lexical";
import { CollapsibleContainerNode } from "./nodes/CollapsibleContainerNode";
import { CollapsibleContentNode } from "./nodes/CollapsibleContentNode";
import { CollapsibleTitleNode } from "./nodes/CollapsibleTitleNode";
import { DayContainerNode } from "./nodes/DayContainerNode";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import DayContainerPlugin from "./plugins/DayContainerPlugin";
import TransformCategoryPlugin from "./plugins/TransformCategoryPlugin";
import { DayTitleNode } from "./nodes/DayTitleNode";
import { DayContentNode } from "./nodes/DayContentNode";

// Get editor initial state (e.g. loaded from backend)
const loadContent = () => {

  const state = {
    "root": {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "children": [
                    {
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "@February 19, 2025",
                      "type": "text",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "type": "paragraph",
                  "version": 1,
                  "textFormat": 0,
                  "textStyle": ""
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "type": "day-title",
              "version": 1
            },
            {
              "children": [
                {
                  "children": [],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "type": "paragraph",
                  "version": 1,
                  "textFormat": 0,
                  "textStyle": ""
                },
                {
                  "children": [
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "detail": 0,
                              "format": 0,
                              "mode": "normal",
                              "style": "",
                              "text": "#todo",
                              "type": "text",
                              "version": 1
                            }
                          ],
                          "direction": "ltr",
                          "format": "",
                          "indent": 0,
                          "type": "paragraph",
                          "version": 1,
                          "textFormat": 0,
                          "textStyle": ""
                        }
                      ],
                      "direction": "ltr",
                      "format": "",
                      "indent": 0,
                      "type": "collapsible-title",
                      "version": 1
                    },
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "detail": 0,
                              "format": 0,
                              "mode": "normal",
                              "style": "",
                              "text": "- [x] task on",
                              "type": "text",
                              "version": 1
                            }
                          ],
                          "direction": "ltr",
                          "format": "",
                          "indent": 0,
                          "type": "paragraph",
                          "version": 1,
                          "textFormat": 0,
                          "textStyle": ""
                        }
                      ],
                      "direction": "ltr",
                      "format": "",
                      "indent": 0,
                      "type": "collapsible-content",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "type": "collapsible-container",
                  "version": 1,
                  "open": true
                },
                {
                  "children": [],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "paragraph",
                  "version": 1,
                  "textFormat": 0,
                  "textStyle": ""
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "type": "day-content",
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "type": "day-container",
          "version": 1,
          "open": true,
          "date": "2/19/2025"
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "type": "root",
      "version": 1
    }
  }

  const value = JSON.stringify(state);
  console.log('- value', JSON.parse(value));

  return value;
}

const Editor = () => {
  // RQ
  const initialEditorState = loadContent();


  // METHODS
  const onError = (error: Error) => {
    console.error(error);
  }

  const onChange = (editorState: EditorState) => {
    console.log(editorState.toJSON());
  };

  // VARS
  const initialConfig = {
    editorState: initialEditorState,
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
        <OnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  )
};

export default Editor;

