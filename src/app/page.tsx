export const dynamic = "force-dynamic";
import React from "react";

import TopicCreateForm from "@/components/topic/topic-create-form";
import TopicList from "@/components/topic/topic-list";
import { fetchTopPosts } from "@/dd";
import PostList from "@/components/post/post-list";

export default async function App() {
  const topPosts = await fetchTopPosts();
  return (
    <>
      <div className='flex justify-between'>
        <div>
          <h1 className='text-xl mt-2'>Top Posts</h1>
          <PostList postList={topPosts} />
        </div>
        <div>
          <TopicCreateForm />
          <TopicList />
        </div>
      </div>
      <div></div>
    </>
  );
}
