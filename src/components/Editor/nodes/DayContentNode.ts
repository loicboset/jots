import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  ElementNode,
  LexicalNode,
  SerializedElementNode,
} from 'lexical';

type SerializedDayContentNode = SerializedElementNode;

export function $convertDayContentElement(): DOMConversionOutput | null {
  const node = $createDayContentNode();
  return {
    node,
  };
}

export class DayContentNode extends ElementNode {
  static getType(): string {
    return 'day-content';
  }

  static clone(node: DayContentNode): DayContentNode {
    return new DayContentNode(node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('div');
    return dom;
  }

  updateDOM(): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-collapsible-content')) {
          return null;
        }
        return {
          conversion: $convertDayContentElement,
          priority: 2,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
    return { element };
  }

  static importJSON(serializedNode: SerializedDayContentNode): DayContentNode {
    return $createDayContentNode().updateFromJSON(serializedNode);
  }

  isShadowRoot(): boolean {
    return true;
  }
}

export function $createDayContentNode(): DayContentNode {
  return new DayContentNode();
}

export function $isDayContentNode(node: LexicalNode | null | undefined): node is DayContentNode {
  return node instanceof DayContentNode;
}
