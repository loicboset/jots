import { DOMExportOutput, ElementNode, LexicalNode, NodeKey, SerializedElementNode, Spread } from 'lexical';

type SerializedCollapsibleContainerNode = Spread<
  {
    show: boolean;
    name: string;
    color: string;
  },
  SerializedElementNode
>;

export class CollapsibleContainerNode extends ElementNode {
  __show: boolean;
  __name: string;
  __color: string;

  constructor(show: boolean, name: string, color: string, key?: NodeKey) {
    super(key);
    this.__show = show;
    this.__name = name;
    this.__color = color;
  }

  static getType(): string {
    return 'collapsible-container';
  }

  static clone(node: CollapsibleContainerNode): CollapsibleContainerNode {
    return new CollapsibleContainerNode(node.__show, node.__name, node.__color, node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('div');
    dom.setAttribute('name', this.__name);
    dom.classList.add('Collapsible__container');
    dom.style.borderColor = this.__color;

    return dom;
  }

  updateDOM(prevNode: this, dom: HTMLDetailsElement): boolean {
    dom.setAttribute('name', this.__name);

    if (this.__show) {
      dom.style.display = 'block';
    } else {
      dom.style.display = 'none';
    }

    return false;
  }

  static importJSON(serializedNode: SerializedCollapsibleContainerNode): CollapsibleContainerNode {
    const { show, name, color } = serializedNode;
    return $createCollapsibleContainerNode(show, name, color).updateFromJSON(serializedNode);
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('details');
    element.classList.add('Collapsible__container');
    element.setAttribute('name', this.__name.toString());
    element.setAttribute('color', this.__color.toString());
    return { element };
  }

  exportJSON(): SerializedCollapsibleContainerNode {
    return {
      ...super.exportJSON(),
      show: this.__show,
      name: this.__name,
      color: this.__color,
    };
  }

  setName(name: string): void {
    const writable = this.getWritable();
    writable.__name = name;
  }

  setColor(dom: HTMLElement | null, color: string): void {
    if (!dom) return;
    dom.style.borderColor = color;
  }

  hide(): void {
    const writable = this.getWritable();
    writable.__show = false;
  }

  show(): void {
    const writable = this.getWritable();
    writable.__show = true;
  }
}

export function $createCollapsibleContainerNode(
  isOpen: boolean,
  name: string,
  color: string,
): CollapsibleContainerNode {
  return new CollapsibleContainerNode(isOpen, name, color);
}

export function $isCollapsibleContainerNode(node: LexicalNode | null | undefined): node is CollapsibleContainerNode {
  return node instanceof CollapsibleContainerNode;
}
