import { Skeleton } from "@heroui/react";
import React from "react";

export default function PostLoading() {
  return (
    <div>
      <div className='my-2'>
        <Skeleton className='w-3/5 rounded-lg'>
          <div className='h-6 w-full rounded-lg bg-secondary' />
        </Skeleton>
      </div>
      <div className=' mt-2  rounded'>
        <Skeleton className='w-4/5 rounded-lg'>
          <div className='h-6 w-full rounded-lg bg-secondary' />
        </Skeleton>
      </div>
    </div>
  );
}
