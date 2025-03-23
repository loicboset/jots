import {
  $createParagraphNode,
  ElementNode,
  LexicalNode,
  NodeKey,
  ParagraphNode,
  RangeSelection,
  SerializedElementNode,
} from "lexical";

type SerializedAiPromptNode = SerializedElementNode;

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

  static importJSON(serializedNode: SerializedAiPromptNode): AiPromptNode {
    return $createAiPromptNode().updateFromJSON(serializedNode);
  }

  updatePlaceholderFromJSON(serializedNode: { placeholder: string }): void {
    const writable = this.getWritable(); // Ensure we can modify the node
    writable.__placeholder = serializedNode.placeholder;
  }
}

export function $createAiPromptNode(): AiPromptNode {
  const prompt = "Generating prompt with Ai, please wait ...";

  return new AiPromptNode(prompt);
}

export function $isAiPromptNode(node: LexicalNode | null | undefined): node is AiPromptNode {
  return node instanceof AiPromptNode;
}