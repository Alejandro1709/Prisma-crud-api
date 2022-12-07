import { Router } from 'express';
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';

const router = Router();

router.route('/').get(getAllPosts).post(createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

export default router;
