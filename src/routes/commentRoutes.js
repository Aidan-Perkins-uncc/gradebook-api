import express from 'express';
import {
  validateId,
  validateCreateComment,
  validateUpdateComment,
  validateCommentsQuery,
} from '../middleware/commentValidators.js';

import {
  getAllCommentsHandler,
  getCommentByIdHandler,
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from '../controllers/commentController.js';

import { authorizeCommentOwnership } from '../middleware/authorizeOwnershipComment.js';
import { authenticate } from '../middleware/authenticate.js';
const router = express.Router();

router.get('/', validateCommentsQuery, getAllCommentsHandler);

router.get('/:id', validateId, getCommentByIdHandler);

router.post('/', authenticate, validateCreateComment, createCommentHandler);

router.put('/:id', authenticate, authorizeCommentOwnership, validateId,   validateUpdateComment, updateCommentHandler);

router.delete('/:id', authenticate, authorizeCommentOwnership, validateId, deleteCommentHandler);

export default router;
