import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPosts = async (_req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  res.status(200).json(posts);
};

export const getPost = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!post) {
    return res.status(404).json({ message: 'This post does not exist!' });
  }

  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      slug: title.replaceAll(' ', '-').toLowerCase(),
      authorId: Number(authorId),
    },
  });

  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const { title, content } = req.body;

  const post = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: {
      title,
      content,
      slug: title.replaceAll(' ', '-').toLowerCase(),
    },
  });

  if (!post) {
    return res.status(404).json({ message: 'This post does not exist!' });
  }

  res.status(200).json({ message: 'Post updated!' });
};

export const deletePost = async (req, res) => {
  const post = await prisma.post.delete({
    where: { id: Number(req.params.id) },
  });

  if (!post) {
    return res.status(404).json({ message: 'This post does not exist!' });
  }

  res.status(200).json({ message: 'Post deleted!' });
};
