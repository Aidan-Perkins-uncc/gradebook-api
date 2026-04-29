import express from 'express';
import {
    getAllCoursesHandler,
    getCourseByIdHandler,
    createCourseHandler,
    updateCourseHandler,
    deleteCourseHandler,
} from '../controllers/courseControler.js';

import {
    validateId,
    validateCreateCourse,
    validateUpdateCourse,
    validateCourseQuery,
} from '../middleware/courseValidators.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/', authenticate, authorizeRoles('TEACHER'), validateCourseQuery, getAllCoursesHandler);
router.get('/:id', authenticate, validateId, getCourseByIdHandler);
router.post('/', authenticate, authorizeRoles('TEACHER'), validateCreateCourse, createCourseHandler);
router.put('/:id', authenticate, validateId, authorizeRoles('TEACHER'), authorizeOwnership, validateUpdateCourse, updateCourseHandler);
router.delete('/:id', authenticate, authorizeRoles('TEACHER'), authorizeOwnership, deleteCourseHandler);

export default router;