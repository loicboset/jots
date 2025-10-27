type BlogPostData = {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
};

type BlogPostListElement = {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
};

export type { BlogPostData, BlogPostListElement };
