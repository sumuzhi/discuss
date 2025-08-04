import { prisma } from "..";

export const getPosts = async (topicId: string) => {
  return await prisma.post.findMany({
    where: {
      topicId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
    },
  });
};

export const fetchTopPosts = async () => {
  return await prisma.post.findMany({
    orderBy: [
      {
        comment: {
          _count: "desc",
        },
      },
    ],
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      Topic: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
    },
  });
};

export const getPost = async (postId: string) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
    },
  });
};