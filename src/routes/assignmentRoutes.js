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
import { authorizeOwnership } from '../middleware/authorizeOwnershipAssignment.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js'
import { authorizeCourseTeacher } from '../middleware/authorizeCourseTeacher.js'


const router = express.Router();
router.get('/', validateAssignmentQuery, getAllAssignmentsHandler);
router.get('/:id', validateId, getAssignmentByIdHandler);
router.post('/:id', authenticate, validateId, authorizeRoles('TEACHER'), authorizeCourseTeacher, validateCreateAssignment, createAssignmentHandler);
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