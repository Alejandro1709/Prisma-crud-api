import express from 'express';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1/posts', async (_req, res) => {
  const posts = await prisma.post.findMany();
  res.status(200).json(posts);
});

app.get('/api/v1/posts/:id', async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!post) {
    return res.status(404).json({ message: 'This post does not exist!' });
  }

  res.status(200).json(post);
});

app.post('/api/v1/posts', async (req, res) => {
  const { title, content } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      slug: title.replaceAll(' ', '-').toLowerCase(),
    },
  });

  res.status(201).json(post);
});

app.put('/api/v1/posts/:id', async (req, res) => {
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
});

app.delete('/api/v1/posts/:id', async (req, res) => {
  const post = await prisma.post.delete({
    where: { id: Number(req.params.id) },
  });

  if (!post) {
    return res.status(404).json({ message: 'This post does not exist!' });
  }

  res.status(200).json({ message: 'Post deleted!' });
});

app.listen(2023, () => console.log('Server running on port 2023'));
