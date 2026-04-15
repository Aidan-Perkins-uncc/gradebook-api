import express from 'express';
import {
    getAllAssignmentsHandler,
    getAssignmentByIdHandler,
    createAssignmentHandler,
    updateAssignmentHandler,
    deleteAssignmentHandler,
} from '../controllers/assignmentController.js';

import {
    validateId,
    validateCreateAssignment,
    validateUpdateAssignment,
    validateAssignmentQuery,
} from '../middleware/assignmentValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/', validateAssignmentQuery, getAllAssignmentsHandler);
router.get('/:id', validateId, getAssignmentByIdHandler);
router.post('/', authenticate, validateCreateAssignment, createAssignmentHandler);
router.put('/:id',
    authenticate,
    validateId,
    authorizeOwnership,
    validateUpdateAssignment,
    updateAssignmentHandler,
);
router.delete(
    '/:id',
    authenticate,
    validateId,
    authorizeOwnership,
    deleteAssignmentHandler,
);

export default router