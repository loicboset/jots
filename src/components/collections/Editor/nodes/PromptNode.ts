import {
  $createParagraphNode,
  ElementNode,
  LexicalNode,
  NodeKey,
  ParagraphNode,
  RangeSelection,
  SerializedElementNode,
} from "lexical";

type SerializedPromptNode = SerializedElementNode;

export class PromptNode extends ElementNode {
  __placeholder: string;
  __prompt_index: number;

  constructor(placeholder: string, promptIndex: number, key?: NodeKey) {
    super(key);
    this.__placeholder = placeholder;
    this.__prompt_index = promptIndex;
  }

  static getType(): string {
    return "prompt";
  }

  static clone(node: PromptNode): PromptNode {
    return new PromptNode(node.__placeholder, node.__prompt_index, node.__key);
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

  static importJSON(serializedNode: SerializedPromptNode): PromptNode {
    return $createPromptNode().updateFromJSON(serializedNode);
  }

  nextPrompt(): void {
    const index = (this.__prompt_index + 1) % prompts.length;
    const writable = this.getWritable();
    writable.__placeholder = getPrompt(index);
    writable.__prompt_index = index;
  }

  previousPrompt(): void {
    const index = (this.__prompt_index - 1 + prompts.length) % prompts.length;
    const writable = this.getWritable();
    writable.__placeholder = getPrompt(index);
    writable.__prompt_index = index;
  }
}

export function $createPromptNode(): PromptNode {
  const index = getRandomPromptIndex();
  const prompt = getPrompt(index);

  return new PromptNode(prompt, index);
}

export function $isPromptNode(
  node: LexicalNode | null | undefined,
): node is PromptNode {
  return node instanceof PromptNode;
}

const getPrompt = (index: number): string => `<- ${prompts[index]} ->`;

const getRandomPromptIndex = (): number => {
  const index = Math.floor(Math.random() * prompts.length);
  return index;
};

const prompts = [
  // Problem-Solving & Learning
  "What challenges did you face today?",
  "What did you learn today?",
  "What small wins did you achieve?",
  "What are your current uncertainties?",
  "What’s the next step in your project?",
  "What mistakes did you make, and what will you do differently next time?",
  "How could you improve your workflow or process?",
  "What’s distracting you from deep work?",
  "What feedback have you received recently?",
  "How are you feeling about your work?",
  "What’s a recent technical challenge you overcame?",
  "What’s a concept or technology you want to explore?",
  "What’s a bug you couldn’t solve today?",
  "What’s a technical decision you made recently?",
  "What’s a 'Eureka' moment you had recently?",

  // Productivity & Workflow
  "What’s slowing you down?",
  "What tools or shortcuts made your work easier today?",
  "What’s your biggest time-waster?",
  "What part of your workflow needs improvement?",
  "What’s one thing you could have done more efficiently?",

  // Career Growth & Soft Skills
  "How have you grown as a developer in the past 6 months?",
  "What’s a piece of feedback you received that stuck with you?",
  "What’s one skill (technical or soft) you want to improve?",
  "How did you collaborate with others today?",
  "What’s one thing you could do to help a junior developer?",

  // Reflections & Creativity
  "What’s something you built that you’re proud of?",
  "If you could rewrite a part of your codebase, what would you change?",
  "What are your long-term goals as a developer?",
  "What’s one assumption you made today that turned out to be wrong?",
  "What advice would you give yourself if you were just starting out?",
];
