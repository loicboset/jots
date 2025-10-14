"use client";

import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";

import AiPromptNodePlugin from "./plugins/AiPromptNodePlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import ComponentPickerMenuPlugin from "./plugins/ComponentPickerPlugin";
import DailyAutoPromptPlugin from "./plugins/DailyAutoPromptPlugin";
import DummyDataPlugin from "./plugins/DummyDataPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import OnChangePlugin from "./plugins/OnChangePlugin";
import PromptNodePlugin from "./plugins/PromptNodePlugin";
import SkilledPromptNodePlugin from "./plugins/SkilledPromptNodePlugin";
import TransformCategoryPlugin from "./plugins/TransformCategoryPlugin";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";

import "./index.css";

type Props = {
  userID: string;
};

const Editor = ({ userID }: Props): React.ReactElement => (
  <>
    <RichTextPlugin
      contentEditable={
        <div className="flex-1 overflow-y-auto">
          <div className="h-full w-full relative focus:outline-none">
            <ContentEditable className="h-full w-full focus:outline-none" />
          </div>
        </div>
      }
      ErrorBoundary={LexicalErrorBoundary}
    />
    <AiPromptNodePlugin />
    <CollapsiblePlugin userID={userID} />
    <TransformCategoryPlugin userID={userID} />
    <OnChangePlugin />
    <CodeHighlightPlugin />
    <ComponentPickerPlugin />
    <ComponentPickerMenuPlugin />
    <PromptNodePlugin />
    <DummyDataPlugin />
    <HistoryPlugin />
    <AutoLinkPlugin />
    <ClickableLinkPlugin />
    <TabIndentationPlugin maxIndent={7} />
    <MarkdownShortcutPlugin />
    <ListPlugin />
    <CheckListPlugin />
    <SkilledPromptNodePlugin />
    <DailyAutoPromptPlugin />

    {/* <TreeViewPlugin /> */}
  </>
);

export default Editor;
