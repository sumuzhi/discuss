import { prisma } from "..";

export const fetchComments = async (postId: string) => {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      
    },
  });
};
