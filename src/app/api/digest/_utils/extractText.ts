/* eslint-disable @typescript-eslint/no-explicit-any */
const extractText = (children: any[]): string[] => {
  const text: string[] = [];

  children.forEach((child) => {
    if (child.type === "text") {
      text.push(child.text);
    } else if (child.children && Array.isArray(child.children)) {
      text.push(...extractText(child.children));
    }
  });
  return text;
};

export default extractText;
