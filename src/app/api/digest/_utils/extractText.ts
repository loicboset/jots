/* eslint-disable @typescript-eslint/no-explicit-any */
const extractText = (children: any[]): string[] => {
  const text: string[] = [];

  children.forEach((child) => {
    if (child.type === 'text') {
      text.push(child.text);
    }
    // Handle GitHub chip nodes
    else if (child.type === 'github-chip') {
      text.push(
        `[GitHub: ${child.label} — ${child.title}${
          child.description ? ' | ' + child.description : ''
        } (${child.url})]`,
      );
    }
    // Recurse into children if any
    else if (child.children && Array.isArray(child.children)) {
      text.push(...extractText(child.children));
    }
  });

  return text;
};

export default extractText;
