function extractTextFromLexicalJSON(node: any): string {
  if (!node) return "";

  // Handle plain text
  if (node.text) return node.text;

  // Handle custom GitHub chip node
  if (node.type === "github-chip") {
    return `[GitHub: ${node.label} — ${node.title}${
      node.description ? " | " + node.description : ""
    } (${node.url})]`;
  }

  // Handle children recursively
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromLexicalJSON).join(" ");
  }

  return "";
}

function lexicalToPlainText(editorState: any): string {
  return extractTextFromLexicalJSON(editorState.root).trim();
}

export default lexicalToPlainText;
