import { prisma } from "..";

export const getTopic = async (id: string) => {
  return prisma.topic.findUnique({
    where: {
      id,
    },
  });
};

export const getTopics = async () => {
  return prisma.topic.findMany({
    include: {
      _count: {
        select: {
          post: true,
        },
      },
    },
  });
};
