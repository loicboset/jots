import Link from "next/link";

import { BlogPostListElement } from "../../types/blog/blog_post_data";
import getSortedPostsData from "../../utils/getSortedPostsData/getSortedPostsData";

type Props = {
  posts: BlogPostListElement[];
};

const Blog = ({ posts }: Props): React.ReactElement => (
  <div className="mx-6 mt-4">
    <div className="flex justify-between">
      <Link href="/" className="">
        <h1 className='text-5xl text-indigo-500'>DevLog</h1>
      </Link>
    </div>

    <div className="py-24 bg-white">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            DevLog Blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We also write. Its healthy.
          </p>
          <div className="pt-10 mt-10 space-y-16 border-t border-gray-200 sm:mt-16 sm:pt-16">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between max-w-xl">
                <div className="flex items-center text-xs gap-x-4">
                  <time dateTime={post.date} className="text-gray-500">
                    {post.date}
                  </time>
                </div>
                <div className="relative group">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const getStaticProps = async (): Promise<{
  props: { posts: BlogPostListElement[] };
}> => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};

export default Blog;