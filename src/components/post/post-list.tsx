"use client";
import { Avatar, Listbox, ListboxItem } from "@heroui/react";
import React from "react";
import type { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

type PostList = {
  _count: { comment: number };
  user: { name: string | null; image?: string | null } | null;
} & Post;

export default function PostList({ postList }: { postList: PostList[] }) {
  const router = useRouter();
  console.log(postList);
  return (
    <div className='w-[300px]'>
      <Listbox
        aria-label='Post List'
        itemClasses={{
          base: "border-small border-default-200 mt-4",
        }}
      >
        {postList.map((item) => (
          <ListboxItem
            onPress={() => {
              router.push(`/topics/${item.topicId}/posts/${item.id}`);
            }}
            key={item.id}
            description={<p className='text-small mt-3'>{item?.user?.name}</p>}
            startContent={
              item.user?.image && (
                <div>
                  <Avatar src={item.user.image} className='w-8 h-8' />
                </div>
              )
            }
            endContent={
              <span className='text-small text-gray-400 whitespace-nowrap self-end'>
                {item._count.comment} comments
              </span>
            }
          >
            <div className='max-w-[142px] truncate'>{item.title}</div>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
