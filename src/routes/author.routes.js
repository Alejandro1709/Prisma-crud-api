import { Router } from 'express';
import {
  getAllAuthors,
  getAuthor,
  createAuthor,
} from '../controllers/authorController.js';

const router = Router();

router.route('/').get(getAllAuthors).post(createAuthor);

router.route('/:id').get(getAuthor);

export default router;
