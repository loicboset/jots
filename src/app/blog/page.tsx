import Link from 'next/link';

import Header from '@/components/collections/layouts/Header';

import { BlogPostListElement } from '../../types/blog/blog_post_data';
import getSortedPostsData from '../../utils/getSortedPostsData/getSortedPostsData';

const Blog = async (): Promise<React.ReactElement> => {
  const posts: BlogPostListElement[] = getSortedPostsData();

  return (
    <div>
      <Header />
      <div className="py-24">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Blog</h2>
            <p className="mt-2 text-lg leading-8">We also write. Its healthy.</p>
            <div className="pt-10 mt-10 space-y-16 border-t border-gray-200 sm:mt-16 sm:pt-16">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between max-w-xl"
                >
                  <div className="flex items-center text-xs gap-x-4">
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <div className="relative group">
                    <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-300">
                      <Link href={`/blog/${post.id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 line-clamp-3">{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
