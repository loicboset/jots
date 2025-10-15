import {
  DOMExportOutput,
  ElementNode,
  isHTMLElement,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread,
} from 'lexical';

import { setDomHiddenUntilFound } from '../plugins/CollapsiblePlugin/CollapsibleUtils';
import invariant from '../utils/invariant';

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
    return dom;
  }

  updateDOM(prevNode: this, dom: HTMLDetailsElement): boolean {
    const currentOpen = this.__open;

    if (prevNode.__open !== currentOpen) {
      // details is not well supported in Chrome #5582
      const contentDom = dom.children[1];
      invariant(isHTMLElement(contentDom), 'Expected contentDom to be an HTMLElement');
      if (currentOpen) {
        dom.setAttribute('open', '');
        contentDom.hidden = false;
      } else {
        dom.removeAttribute('open');
        setDomHiddenUntilFound(contentDom);
      }
    }

    return false;
  }

  static importJSON(serializedNode: SerializedDayContainerNode): DayContainerNode {
    return $createDayContainerNode(true, serializedNode.date).updateFromJSON(serializedNode);
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
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

  setOpen(open: boolean): void {
    const writable = this.getWritable();
    writable.__open = open;
  }

  getOpen(): boolean {
    return this.getLatest().__open;
  }

  toggleOpen(): void {
    this.setOpen(!this.getOpen());
  }
}

export function $createDayContainerNode(isOpen: boolean, date: string): DayContainerNode {
  return new DayContainerNode(isOpen, date);
}

export function $isDayContainerNode(
  node: LexicalNode | null | undefined,
): node is DayContainerNode {
  return node instanceof DayContainerNode;
}
