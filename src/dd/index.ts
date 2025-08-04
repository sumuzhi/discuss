import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { getTopic, getTopics } from "./queries/topic";
export { getPosts, fetchTopPosts, getPost } from "./queries/post";
export { fetchComments } from "./queries/comment";
