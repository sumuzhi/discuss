import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostLoading from "@/components/post/post-loading";
import PostShow from "@/components/post/post-show";
import React, { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string; postId: string }>;
}) {
  const { postId } = await params;

  return (
    <div className='space-y-3'>
      <Suspense fallback={<PostLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} />
      <CommentList postId={postId}/>
    </div>
  );
}
