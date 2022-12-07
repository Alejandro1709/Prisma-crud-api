import { Router } from 'express';
import {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/authorController.js';

const router = Router();

router.route('/').get(getAllAuthors).post(createAuthor);

router.route('/:id').get(getAuthor).put(updateAuthor).delete(deleteAuthor);

export default router;
