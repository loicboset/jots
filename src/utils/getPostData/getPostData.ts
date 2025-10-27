import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import { BlogPostData } from '../../types/blog/blog_post_data';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/_posts');

const getPostData = async (id: string): Promise<BlogPostData> => {
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => {
    // Remove ".md" from file name to get id
    const postID = name.replace(/\.md$/, '');
    if (postID === id) return true;
  });

  if (!fileName) {
    throw new Error(`No file found with id: ${id}`);
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, { excerpt: true });

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    date: matterResult.data.date,
    title: matterResult.data.title,
    contentHtml,
  };
};

export default getPostData;
