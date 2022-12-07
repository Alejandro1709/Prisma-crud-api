import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();

const prisma = new PrismaClient();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1/posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.listen(2023, () => console.log('Server running on port 2023'));
