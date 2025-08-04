import React from "react";
import CommentShow from "./comment-show";
import { fetchComments } from "@/dd";

export default async function CommentList({ postId }: { postId: string }) {
  const comments = await fetchComments(postId);
  console.log(comments);

  return (
    <div>
      <h1 className='text-lg font-bold'>All 20 comments</h1>
      {comments.map((comment) => (
        <CommentShow key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
