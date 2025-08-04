import { Skeleton } from "@heroui/react";
import React from "react";

export default function PostLoading() {
  return (
    <div>
      <div className='my-2'>
        <Skeleton />
      </div>
      <div className='p-4 border rounded'>
        <Skeleton />
      </div>
    </div>
  );
}
