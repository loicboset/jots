import { ElementNode, LexicalNode, NodeKey, SerializedElementNode } from 'lexical';

type SerializedPromptNode = SerializedElementNode;

export class SkilledPromptNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType(): string {
    return 'skilled-prompt';
  }

  static clone(node: SkilledPromptNode): SkilledPromptNode {
    return new SkilledPromptNode(node.__key);
  }

  createDOM(): HTMLElement {
    const element = document.createElement('p');
    element.classList.add('skilled-prompt');
    element.dataset.placeholder = 'Type something...';
    element.dataset.has_text = 'false';
    return element;
  }

  updateDOM(prevNode: this, dom: HTMLElement): boolean {
    const hasText = dom.textContent?.trim() !== '';
    dom.dataset.has_text = String(hasText);
    return false;
  }

  static importJSON(serializedNode: SerializedPromptNode): SkilledPromptNode {
    return $createSkilledPromptNode().updateFromJSON(serializedNode);
  }
}

export function $createSkilledPromptNode(): SkilledPromptNode {
  return new SkilledPromptNode();
}

export function $isSkilledPromptNode(
  node: LexicalNode | null | undefined,
): node is SkilledPromptNode {
  return node instanceof SkilledPromptNode;
}
