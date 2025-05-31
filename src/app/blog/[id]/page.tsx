// app/blog/[id]/page.tsx

import { Metadata } from "next";
import Link from "next/link";

import Spinner from "@/components/ui/loaders/Spinner";
import getPostData from "@/utils/getPostData/getPostData";

import styles from "./blog.module.css";

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams(): { id: string }[] {
  return [
    { id: "benefits-of-dev-journaling" },
    { id: "journaling-for-developers-a-simple-habit-for-big-results" },
    { id: "learnings-as-a-software-engineer" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const postData = await getPostData(id);
  return { title: postData?.title || "Post" };
}

const PostPage = async ({ params }: Props): Promise<React.ReactElement> => {
  const { id } = await params
  const postData = await getPostData(id);

  if (!postData) return <Spinner size="small" />;

  return (
    <div className="mx-6 mt-4">
      <div className="flex justify-between">
        <Link href="/">
          <h1 className="text-5xl text-indigo-500">Jots</h1>
        </Link>
        <div className="flex space-x-4 items-center">
          <Link href="/blog" className="text-sm/6 mr-8 font-semibold lg:block">
            Blog <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link href="/login" className="text-sm/6 font-semibold lg:block">
            Log in
          </Link>
          <Link
            href="/signup"
            className="
              rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs
              hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
            "
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="sm:w-3/4">
          <h1 className="justify-center mt-3 text-4xl font-semibold text-gray-300 leading-14">
            {postData.title}
          </h1>
          <div className="flex flex-col items-center justify-center mt-4 sm:mt-10">
            <div>
              <div className="mb-10 border border-gray-100" />
              <div
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                className={`${styles["blog-post"]} text-gray-300`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;