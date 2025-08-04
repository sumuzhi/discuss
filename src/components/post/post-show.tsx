import { getPost } from "@/dd";
import { notFound } from "next/navigation";
import React from "react";

export default async function PostShow({ postId }: { postId: string }) {
  const post = await getPost(postId);
  if (!post) {
    return notFound();
  }
  return (
    <div>
      <h1 className='text-2xl font-bold my-2'>{post.title}</h1>
      <p className='p-4 border rounded'>{post.content}</p>
    </div>
  );
}
