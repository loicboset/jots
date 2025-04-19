type LexicalNode = {
  type: string;
  text?: string;
  children?: LexicalNode[];
};

type LexicalState = {
  root: LexicalNode;
};

const isLexicalStateEmpty = (state: LexicalState): boolean => {
  const isEmptyNode = (node: LexicalNode): boolean =>
    node.text !== undefined ? node.text.trim() === "" : node.children?.every(isEmptyNode) ?? true;

  return state?.root?.children?.every(isEmptyNode) ?? false;
};

export default isLexicalStateEmpty;
