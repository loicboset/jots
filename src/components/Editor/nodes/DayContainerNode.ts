import { DOMExportOutput, ElementNode, LexicalNode, NodeKey, SerializedElementNode, Spread } from 'lexical';

type SerializedDayContainerNode = Spread<
  {
    open: boolean;
    date: string;
  },
  SerializedElementNode
>;

export class DayContainerNode extends ElementNode {
  __open: boolean;
  __date: string;

  constructor(open: boolean, date: string, key?: NodeKey) {
    super(key);
    this.__open = open;
    this.__date = date;
  }

  static getType(): string {
    return 'day-container';
  }

  static clone(node: DayContainerNode): DayContainerNode {
    return new DayContainerNode(node.__open, node.__date, node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('div');

    dom.classList.add('bg-gray-500');

    return dom;
  }

  updateDOM(): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedDayContainerNode): DayContainerNode {
    return $createDayContainerNode(serializedNode.open, serializedNode.date).updateFromJSON(serializedNode);
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
    element.classList.add('bg-red-500');
    return { element };
  }

  exportJSON(): SerializedDayContainerNode {
    return {
      ...super.exportJSON(),
      open: this.__open,
      date: this.__date,
    };
  }

  getDate(): string {
    return this.__date;
  }
}

export function $createDayContainerNode(isOpen: boolean, date: string): DayContainerNode {
  return new DayContainerNode(isOpen, date);
}

export function $isDayContainerNode(node: LexicalNode | null | undefined): node is DayContainerNode {
  return node instanceof DayContainerNode;
}
