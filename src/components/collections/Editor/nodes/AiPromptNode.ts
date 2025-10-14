import {
  $createParagraphNode,
  ElementNode,
  LexicalNode,
  NodeKey,
  ParagraphNode,
  RangeSelection,
  SerializedElementNode,
} from "lexical";

type SerializedAiPromptNode = SerializedElementNode & {
  placeholder: string;
};

export class AiPromptNode extends ElementNode {
  __placeholder: string;

  constructor(placeholder: string, key?: NodeKey) {
    super(key);
    this.__placeholder = placeholder;
  }

  static getType(): string {
    return "ai-prompt";
  }

  static clone(node: AiPromptNode): AiPromptNode {
    return new AiPromptNode(node.__placeholder, node.__key);
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

  insertNewAfter(
    rangeSelection: RangeSelection,
    restoreSelection: boolean,
  ): ParagraphNode {
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

  static importJSON(serializedNode: SerializedAiPromptNode): AiPromptNode {
    return $createAiPromptNode(serializedNode.placeholder).updateFromJSON(
      serializedNode,
    );
  }

  exportJSON(): SerializedAiPromptNode {
    return {
      ...super.exportJSON(),
      placeholder: this.__placeholder,
    };
  }
}

export function $createAiPromptNode(prompt: string): AiPromptNode {
  return new AiPromptNode(prompt);
}

export function $isAiPromptNode(
  node: LexicalNode | null | undefined,
): node is AiPromptNode {
  return node instanceof AiPromptNode;
}
