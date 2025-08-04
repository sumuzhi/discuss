"use server";
import { auth } from "@/auth";
import { prisma } from "@/dd";
import { revalidatePath } from "next/cache";
import { z } from "zod";
z.config(z.locales.zhCN());
const createCommentSchema = z.object({
  content: z.string().min(10).max(200),
});

interface FormParams {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  postId: string,
  _preState: FormParams,
  formData: FormData
): Promise<FormParams> {
  const content = formData.get("content");

  const result = createCommentSchema.safeParse({
    content,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["请先登录"],
      },
    };
  }
  let data;
  try {
    data = await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id,
        postId,
      },
      include: {
        post: {
          select: {
            topicId: true,
          },
        },
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }
    return {
      errors: {
        _form: ["创建失败"],
      },
    };
  }

  revalidatePath(`/topics/${data?.post?.topicId}/posts/${postId}`);
  // redirect(`/topics/${data?.post?.topicId}/posts/${postId}`);
  return {
    errors: {},
    success: true,
  };
}
