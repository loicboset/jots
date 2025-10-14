import { Metadata } from "next";

import Header from "@/components/collections/layouts/Header";
import Spinner from "@/components/ui/loaders/Spinner";
import getPostData from "@/utils/getPostData/getPostData";

import styles from "./blog.module.css";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams(): { id: string }[] {
  return [
    { id: "benefits-of-dev-journaling" },
    { id: "journaling-for-developers-a-simple-habit-for-big-results" },
    { id: "learnings-as-a-software-engineer" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostData(id);
  return { title: postData?.title || "Post" };
}

const PostPage = async ({ params }: Props): Promise<React.ReactElement> => {
  const { id } = await params;
  const postData = await getPostData(id);

  if (!postData) return <Spinner size="small" />;

  return (
    <div>
      <Header />
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
};

export default PostPage;
