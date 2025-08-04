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

export default function TopCreateForm() {
  const [state, createTopicAction, isPending] = useActionState(
    actions.createTopic,
    {
      errors: {},
    }
  );
  console.log(isPending);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    startTransition(() => createTopicAction(formData));
  };

  return (
    <Popover placement='top-end'>
      <PopoverTrigger>
        <Button color='secondary' variant='bordered' className="ml-auto block">
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input
              name='name'
              label='Name'
              labelPlacement='outside'
              placeholder='Name'
              isInvalid={!!state.errors.name}
              errorMessage={state.errors.name?.[0]}
            />
            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Description'
              isInvalid={!!state.errors.description}
              errorMessage={state.errors.description?.[0]}
            />
            {state.errors._form?.[0] && (
              <div className='text-red-500'>{state.errors._form?.[0]}</div>
            )}
            <Button isLoading={isPending} type='submit' color='secondary'>
              Create
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
