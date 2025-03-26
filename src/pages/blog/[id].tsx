import Head from "next/head";
import Link from "next/link";

import styles from "./blog.module.css";
import { BlogPostData } from "../../types/blog/blog_post_data";
import getPostData from "../../utils/getPostData/getPostData";
import Spinner from "@/components/ui/loaders/Spinner";

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
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-gray-900 whitespace-nowrap"
          >
            DevLog <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="sm:w-3/4">
            <div>
              <h1 className="mt-3 text-2xl font-semibold leading-6 text-center text-gray-900">
                {postData.title}
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 sm:mt-10">
              <div className="sm:w-3/4">
                <div className="mb-10 border border-gray-100" />
                <div
                  dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                  className={styles["blog-post"]}
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
  ];
  return {
    paths,
    fallback: true, // false or "blocking"
  };
};
export default Post;