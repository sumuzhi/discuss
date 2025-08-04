import { getTopics } from "@/dd";
import { Badge, Chip, Link } from "@heroui/react";
import React from "react";

export const ListBoxWarpper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-[260px] p-3 rounded-small border-2 border-gray-300 mt-4 flex gap-3 flex-wrap'>
      {children}
    </div>
  );
};

export default async function TopicList() {
  const topics = await getTopics();
  console.log(topics);

  return (
    <div>
      <ListBoxWarpper>
        {topics.map((item) => (
          <Badge content={item._count.post} key={item.id} color='secondary'>
            <Chip variant='bordered'>
              <Link href={`/topics/${item.id}`}>{item.name}</Link>
            </Chip>
          </Badge>
        ))}
      </ListBoxWarpper>
    </div>
  );
}
