"use client";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@heroui/react";
import React, { startTransition, useActionState } from "react";
import * as actions from "@/actions";

export default function PostCreateForm({ topicId }: { topicId: string }) {
  console.log(topicId);

  const [_state, creatPostAction, isPending] = useActionState(
    actions.createPost.bind(null, topicId),
    {
      errors: {},
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    startTransition(() => creatPostAction(formData));
  };

  return (
    <Popover placement='top-end'>
      <PopoverTrigger>
        <Button color='secondary' variant='bordered' className='ml-auto block'>
          Create a Post
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Post</h3>
            <Input
              name='title'
              label='Title'
              labelPlacement='outside'
              placeholder='Name'
              // isInvalid={!!state.errors.name}
              // errorMessage={state.errors.name?.[0]}
            />
            <Textarea
              name='content'
              label='Content'
              labelPlacement='outside'
              placeholder='Content'
              // isInvalid={!!state.errors.description}
              // errorMessage={state.errors.description?.[0]}
            />

            <Button isLoading={isPending} type='submit' color='secondary'>
              Create
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
