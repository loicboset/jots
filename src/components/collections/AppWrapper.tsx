import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { useJournalEntries } from "@/services/journal_entries";

import { CollapsibleContainerNode } from "./Editor/nodes/CollapsibleContainerNode";
import { CollapsibleContentNode } from "./Editor/nodes/CollapsibleContentNode";
import { CollapsibleTitleNode } from "./Editor/nodes/CollapsibleTitleNode";
import { DayContainerNode } from "./Editor/nodes/DayContainerNode";
import { DayContentNode } from "./Editor/nodes/DayContentNode";
import { DayTitleNode } from "./Editor/nodes/DayTitleNode";

type Props = {
  children: React.ReactNode;
  userID: string;
};

const AppWrapper = ({ children, userID }: Props): React.ReactElement => {
  // RQ
  const { data: entries = [], isLoading } = useJournalEntries(userID);

  if (isLoading) return <p className="p-8 text-lg">Loading...</p>


  // METHODS
  const onError = (error: Error): void => {
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
      {children}
    </LexicalComposer >

  );
};

export default AppWrapper;
