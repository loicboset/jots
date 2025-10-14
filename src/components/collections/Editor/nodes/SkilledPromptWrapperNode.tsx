import {
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread,
} from "lexical";

import { $isSkilledPromptNode } from "./SkilledPromptNode";

type SerializedSkilledPromptNode = Spread<
  {
    text: string;
    skill: string;
  },
  SerializedElementNode
>;

export class SkilledPromptWrapperNode extends ElementNode {
  __text: string;
  __skill: string;

  static getType(): string {
    return "skilled-prompt-wrapper";
  }

  static clone(node: SkilledPromptWrapperNode): SkilledPromptWrapperNode {
    return new SkilledPromptWrapperNode(node.__text, node.__skill, node.__key);
  }

  constructor(text: string, skill: string, key?: NodeKey) {
    super(key);
    this.__text = text;
    this.__skill = skill;
  }

  createDOM(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "skilled-prompt-node border rounded flex flex-col my-2";
    wrapper.dataset["skill"] = this.__skill;

    const header = document.createElement("div");
    header.className =
      "header flex justify-between items-center border-b p-2 select-none";

    const prompt = document.createElement("span");
    prompt.className = "font-medium";
    prompt.textContent = this.__text;

    const skill = document.createElement("span");
    skill.className = "text-gray-100 text-xs";
    skill.textContent = `+1 ${this.__skill}`;

    header.appendChild(prompt);
    header.appendChild(skill);

    const content = document.createElement("div");
    content.className = "content-container";

    wrapper.appendChild(header);
    wrapper.appendChild(content);

    return wrapper;
  }

  updateDOM(prevNode: this, dom: HTMLElement): boolean {
    const children = prevNode.getChildren();
    let hasText = false;
    children.forEach((child) => {
      if ($isSkilledPromptNode(child)) {
        hasText = child.getTextContent().trim() !== "";
      }
    });

    if (hasText) {
      dom.classList.add(`border-indigo-500`);
    } else {
      dom.classList.remove(`border-indigo-500`);
    }

    return false;
  }

  exportJSON(): SerializedSkilledPromptNode {
    return {
      ...super.exportJSON(),
      text: this.__text,
      skill: this.__skill,
    };
  }

  static importJSON(
    serializedNode: SerializedSkilledPromptNode,
  ): SkilledPromptWrapperNode {
    return new SkilledPromptWrapperNode(
      serializedNode.text,
      serializedNode.skill,
    );
  }
}

export function $createSkilledPromptWrapperNode(
  text: string,
  skill: string,
): SkilledPromptWrapperNode {
  return new SkilledPromptWrapperNode(text, skill);
}

export function $isSkilledPromptWrapperNode(
  node: LexicalNode | null | undefined,
): node is SkilledPromptWrapperNode {
  return node instanceof SkilledPromptWrapperNode;
}
