"use client";
import { Button, Textarea } from "@heroui/react";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import * as actions from "@/actions";

export default function CommentCreateForm({ postId }: { postId: string }) {
  const ref = useRef<HTMLFormElement>(null);

  const [state, createCommentAction, isPending] = useActionState(
    actions.createComment.bind(null, postId),
    {
      errors: {},
    }
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    startTransition(() => createCommentAction(formData));
  };

  useEffect(() => {
    if (state.success) ref.current?.reset();
  }, [state]);

  return (
    <form className='space-y-3' onSubmit={handleSubmit}>
      <Textarea
        name='content'
        label='Content'
        labelPlacement='inside'
        placeholder='Enter your comment'
        isInvalid={!!state.errors.content}
        errorMessage={state.errors.content?.[0]}
      />
      <Button
        color='secondary'
        type='submit'
        variant='bordered'
        isLoading={isPending}
      >
        Create Comment
      </Button>
    </form>
  );
}
