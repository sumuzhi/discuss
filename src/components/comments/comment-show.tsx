import React from "react";
import { Avatar } from "@heroui/react";
import type { Comment } from "@prisma/client";
import dayjs from "dayjs";
type IProps = {
  user: {
    name: string | null;
    image: string | null;
  } | null;
} & Comment;
export default function CommentShow<T extends IProps>({
  comment,
}: {
  comment: T;
}) {
  return (
    <div className='border mt-2 p-4 rounded'>
      <div className='flex gap-3'>
        <Avatar
          src={comment?.user?.image || ""}
          alt={comment?.user?.name || ""}
          className='h-10 w-10 rounded-[50%]'
        />
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-500'>
            {comment?.user?.name}
          </p>
          <p className='flex justify-between items-center'>
            <span className='flex-1 text-gray-900'>{comment.content}</span>
            <span className='w-[150px] text-right text-gray-400 text-sm'>
              {dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm:ss")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
