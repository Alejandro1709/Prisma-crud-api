import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllAuthors = async (_req, res) => {
  const authors = await prisma.author.findMany({
    include: {
      posts: true,
    },
  });
  res.status(200).json(authors);
};

export const getAuthor = async (req, res) => {
  const author = await prisma.author.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      posts: true,
    },
  });

  if (!author) {
    return res.status(404).json({ message: 'This author does not exist!' });
  }

  res.status(200).json(author);
};

export const createAuthor = async (req, res) => {
  const { name, email } = req.body;

  const author = await prisma.author.create({
    data: {
      name,
      email,
    },
  });

  res.status(201).json(author);
};
