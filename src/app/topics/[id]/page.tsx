import PostCreateForm from "@/components/post/post-create-form";
import PostList from "@/components/post/post-list";
import { getPosts, getTopic } from "@/dd";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const topic = await getTopic(id);
  const posts = await getPosts(id);

  return (
    <>
      <div className='flex justify-between'>
        <div>
          <h1 className='text-xl mt-2'>{topic?.name}</h1>
          <p className='text-small text-gray-400'>{topic?.description}</p>
          <p className='text-small text-gray-400'>
            {topic?.createdAt?.toLocaleString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <PostCreateForm topicId={id} />
      </div>
      <div className='mt-10'>
        <PostList postList={posts} />
      </div>
    </>
  );
}
