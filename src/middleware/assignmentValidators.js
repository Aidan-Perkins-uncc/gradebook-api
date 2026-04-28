import { handleValidationErrors } from './handleValidationErrors.js';
import { body, query, param } from 'express-validator';

export const validateCreateAssignment = [
    body('title')
        .trim()
        .exists({ values: 'falsy' })
        .withMessage('Title is required')
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters long'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must be at most 500 characters long'),
        handleValidationErrors
];

export const validateUpdateAssignment = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters long'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must be at most 500 characters long'),
        handleValidationErrors
];

export const validateAssignmentQuery = [
    query('courseId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('courseId must be a positive integer'),
    query('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters long'),
    handleValidationErrors,
];

export const validateId = [
    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),
    handleValidationErrors,
];