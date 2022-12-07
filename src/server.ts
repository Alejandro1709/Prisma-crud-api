import express, { Request, Response } from 'express';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(2023, () => console.log('Server running on port 2023'));
