/* eslint-disable max-len */
import Head from "next/head";
import Link from "next/link";

import Spinner from "@/components/ui/loaders/Spinner";

import styles from "./blog.module.css";
import { BlogPostData } from "../../types/blog/blog_post_data";
import getPostData from "../../utils/getPostData/getPostData";

type Props = {
  postData: BlogPostData;
};
const Post = ({ postData }: Props): React.ReactElement => {
  if (!postData) return <Spinner size="small" />;
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className="mx-6 mt-4">
        <div className="flex justify-between">
          <Link href="/">
            <h1 className='text-3xl text-indigo-500'>DevLog</h1>
          </Link>
          <div className='flex space-x-4 items-center'>
            <Link href="/blog" className="text-sm/6 mr-8 font-semibold lg:block">
              Blog <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/login" className="text-sm/6 font-semibold lg:block">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="sm:w-3/4">
            <div>
              <h1 className="justify-center mt-3 text-4xl font-semibold text-gray-300 leading-14">
                {postData.title}
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 sm:mt-10">
              <div>
                <div className="mb-10 border border-gray-100" />
                <div
                  dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                  className={styles["blog-post"] + ' text-gray-300'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (props: {
  params: { id: string };
}): Promise<{ props: { postData: BlogPostData } }> => {
  // VAR
  const postID = props.params.id as string;
  const postData = await getPostData(postID);
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths = async (): Promise<{
  paths: { params: { id: string } }[];
  fallback: boolean;
}> => {
  const paths = [
    { params: { id: "benefits-of-dev-journaling" } },
    { params: { id: "journaling-for-developers-a-simple-habit-for-big-results" } },
    { params: { id: "learnings-as-a-software-engineer" } },
  ];
  return {
    paths,
    fallback: true, // false or "blocking"
  };
};
export default Post;