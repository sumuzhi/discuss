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
    <div>
      <Suspense fallback={<PostLoading />}>
        <PostShow postId={postId} />
      </Suspense>
    </div>
  );
}
