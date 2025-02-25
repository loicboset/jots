import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementNode,
  isHTMLElement,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread,
} from 'lexical';
import { IS_CHROME } from '../utils/environment';
import invariant from '../utils/invariant';
import { setDomHiddenUntilFound } from '../plugins/CollapsiblePlugin/CollapsibleUtils';

type SerializedCollapsibleContainerNode = Spread<
  {
    open: boolean;
    name: string;
    color: string;
  },
  SerializedElementNode
>;

export function $convertDetailsElement(domNode: HTMLDetailsElement): DOMConversionOutput | null {
  const isOpen = domNode.open !== undefined ? domNode.open : true;
  const name = domNode.name;
  const color = domNode.getAttribute('color') || '';
  const node = $createCollapsibleContainerNode(isOpen, name, color);
  return {
    node,
  };
}

export class CollapsibleContainerNode extends ElementNode {
  __open: boolean;
  __name: string;
  __color: string;

  constructor(open: boolean, name: string, color: string, key?: NodeKey) {
    super(key);
    this.__open = open;
    this.__name = name;
    this.__color = color;
  }

  static getType(): string {
    return 'collapsible-container';
  }

  static clone(node: CollapsibleContainerNode): CollapsibleContainerNode {
    return new CollapsibleContainerNode(node.__open, node.__name, node.__color, node.__key);
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    // details is not well supported in Chrome #5582
    let dom: HTMLElement;

    if (IS_CHROME) {
      dom = document.createElement('div');
      dom.setAttribute('open', '');
    } else {
      const detailsDom = document.createElement('details');
      detailsDom.open = this.__open;
      detailsDom.addEventListener('toggle', () => {
        const open = editor.getEditorState().read(() => this.getOpen());
        if (open !== detailsDom.open) {
          editor.update(() => this.toggleOpen());
        }
      });
      dom = detailsDom;
    }
    dom.setAttribute('name', this.__name);
    dom.classList.add('Collapsible__container');
    dom.style.borderColor = this.__color;

    return dom;
  }

  updateDOM(prevNode: this, dom: HTMLDetailsElement): boolean {
    const currentOpen = this.__open;
    dom.setAttribute('name', this.__name);

    if (prevNode.__open !== currentOpen) {
      // details is not well supported in Chrome #5582
      if (IS_CHROME) {
        const contentDom = dom.children[1];
        invariant(isHTMLElement(contentDom), 'Expected contentDom to be an HTMLElement');
        if (currentOpen) {
          dom.setAttribute('open', '');
          contentDom.hidden = false;
        } else {
          dom.removeAttribute('open');
          setDomHiddenUntilFound(contentDom);
        }
      } else {
        dom.open = this.__open;
      }
    }

    return false;
  }

  static importDOM(): DOMConversionMap<HTMLDetailsElement> | null {
    return {
      details: () => {
        return {
          conversion: $convertDetailsElement,
          priority: 1,
        };
      },
    };
  }

  static importJSON(serializedNode: SerializedCollapsibleContainerNode): CollapsibleContainerNode {
    const { open, name, color } = serializedNode;
    return $createCollapsibleContainerNode(open, name, color).updateFromJSON(serializedNode);
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('details');
    element.classList.add('Collapsible__container');
    element.setAttribute('open', this.__open.toString());
    element.setAttribute('name', this.__name.toString());
    element.setAttribute('color', this.__color.toString());
    return { element };
  }

  exportJSON(): SerializedCollapsibleContainerNode {
    return {
      ...super.exportJSON(),
      open: this.__open,
      name: this.__name,
      color: this.__color,
    };
  }

  setName(name: string): void {
    const writable = this.getWritable();
    writable.__name = name;
  }

  setColor(dom: HTMLElement | null, color: string) {
    if (!dom) return;
    dom.style.borderColor = color;
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
