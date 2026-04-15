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

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();
router.get('/', validateCourseQuery, getAllCoursesHandler);
router.get('/:id', validateId, getCourseByIdHandler);
router.post('/', authenticate, validateCreateCourse, createCourseHandler);
router.put(
    '/:id',
    authenticate,
    validateId,
    authorizeOwnership,
    validateUpdateCourse,
    updateCourseHandler,
);
router.delete(
    ':/id',
    authenticate,
    authorizeOwnership,
    deleteCourseHandler,
);

export default router;