import { JournalEntry } from '@/types/api/journal_entries';

type ContentNode = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  root: any;
};

export const countUncheckedListItems = (data: JournalEntry[] | undefined): number | undefined => {
  if (!data) return undefined;

  let count = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverse = (node: any): void => {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'listitem' && node.checked === false) {
      count++;
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  };

  // Type guard to check if content is an object with root
  const isContentNode = (content: unknown): content is ContentNode =>
    typeof content === 'object' && content !== null && 'root' in content;

  data.forEach((entry) => {
    const content = entry.content;
    if (isContentNode(content)) {
      traverse(content.root);
    }
  });

  return count;
};
