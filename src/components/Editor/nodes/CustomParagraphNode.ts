import { EditorConfig, LexicalNode, NodeKey, ParagraphNode } from 'lexical';

export class CustomParagraphNode extends ParagraphNode {
  constructor(key?: NodeKey) {
    super(key);
  }

  static getType() {
    return 'custom-paragraph';
  }

  static clone(node: LexicalNode) {
    return new CustomParagraphNode(node.__key);
  }

  createDOM(config: EditorConfig) {
    const dom = super.createDOM(config);
    return dom;
  }

  updateDOM() {
    return false; // Prevent full re-render
  }

  setDatasetValue(value: string) {
    const writable = this.getWritable();
    writable.setDatasetValue(value);
  }
}
