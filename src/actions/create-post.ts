"use server";
import { auth } from "@/auth";
import { prisma } from "@/dd";
import { redirect } from "next/navigation";
import { z } from "zod";
z.config(z.locales.zhCN());
const createTopicSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "名称必须是3个以上的字母或数字",
    }),
  content: z.string().min(10).max(200),
});

interface FormParams {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  topicId: string,
  _preState: FormParams,
  formData: FormData
): Promise<FormParams> {
  const title = formData.get("title");
  const content = formData.get("content");

  const result = createTopicSchema.safeParse({
    title,
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
    data = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        topicId,
        userId: session.user.id,
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
  redirect(`/topics/${data.id}/posts/${data.id}`);
}
