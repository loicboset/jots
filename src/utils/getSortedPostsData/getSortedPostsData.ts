import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { BlogPostListElement } from "../../types/blog/blog_post_data";

const postsDirectory = path.join(process.cwd(), "src/app/blog/_posts");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripMarkdown = (file: any): string => {
  const parsedContent = file.content;

  const strippedContent = parsedContent
    // Remove images ![alt](url)
    .replace(/!\[.*?\]\(.*?\)/g, "")
    // Remove links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

  file.excerpt = strippedContent;
  return strippedContent;
};

const getSortedPostsData = (): BlogPostListElement[] => {
  // Get file names
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents, { excerpt: stripMarkdown });

    // Combine the data with the id
    const result: BlogPostListElement = {
      id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      excerpt: matterResult.excerpt,
    };
    return result;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export default getSortedPostsData;
