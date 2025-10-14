/* eslint-disable @typescript-eslint/no-explicit-any */
function extractTextFromLexicalJSON(node: any): string {
  if (!node) return "";

  if (node.text) return node.text;

  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromLexicalJSON).join(" ");
  }

  return "";
}

function lexicalToPlainText(editorState: any): string {
  return extractTextFromLexicalJSON(editorState.root).trim();
}

export default lexicalToPlainText;
