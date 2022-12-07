import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/v1/posts', postRoutes);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(2023, () => console.log('Server running on port 2023'));
