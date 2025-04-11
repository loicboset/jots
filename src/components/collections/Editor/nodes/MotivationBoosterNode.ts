import {
  $createParagraphNode,
  ElementNode,
  LexicalNode,
  NodeKey,
  ParagraphNode,
  RangeSelection,
  SerializedElementNode,
} from "lexical";

type SerializedMotivationBoosterNode = SerializedElementNode & {
  placeholder: string;
};

export class MotivationBoosterNode extends ElementNode {
  __placeholder: string;

  constructor(placeholder: string, key?: NodeKey) {
    super(key);
    this.__placeholder = placeholder;
  }

  static getType(): string {
    return "motivation-booster";
  }

  static clone(node: MotivationBoosterNode): MotivationBoosterNode {
    return new MotivationBoosterNode(node.__placeholder, node.__key);
  }

  createDOM(): HTMLElement {
    // Define the DOM element here
    const element = document.createElement("p");
    element.classList.add("node-placeholder");
    element.dataset.placeholder = this.__placeholder;
    return element;
  }

  updateDOM(prevNode: this, dom: HTMLDetailsElement): boolean {
    dom.dataset.placeholder = this.__placeholder;

    // Returning false tells Lexical that this node does not need its
    // DOM element replacing with a new copy from createDOM.
    return false;
  }

  insertNewAfter(rangeSelection: RangeSelection, restoreSelection: boolean): ParagraphNode {
    const newElement = $createParagraphNode();
    newElement.setTextFormat(rangeSelection.format);
    newElement.setTextStyle(rangeSelection.style);
    const direction = this.getDirection();
    newElement.setDirection(direction);
    newElement.setFormat(this.getFormatType());
    newElement.setStyle(this.getTextStyle());
    this.insertAfter(newElement, restoreSelection);
    return newElement;
  }

  static importJSON(serializedNode: SerializedMotivationBoosterNode): MotivationBoosterNode {
    return $createMotivationBoosterNode(serializedNode.placeholder).updateFromJSON(serializedNode);
  }

  exportJSON(): SerializedMotivationBoosterNode {
    return {
      ...super.exportJSON(),
      placeholder: this.__placeholder,
    };
  }
}

export function $createMotivationBoosterNode(placeholder: string): MotivationBoosterNode {
  return new MotivationBoosterNode(placeholder);
};

export function $isMotivationBoosterNode(node: LexicalNode | null | undefined): node is MotivationBoosterNode {
  return node instanceof MotivationBoosterNode;
};