import { handleValidationErrors } from './handleValidationErrors.js';
import { body, param, oneOf, query } from 'express-validator';

export const validateCreateComment = [
  body('content')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Content is required')
    .bail()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters long'),
  handleValidationErrors,
];

export const validateUpdateComment = [
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters long'),
  handleValidationErrors,
];

export const validateCommentsQuery = [
  oneOf([
    query('search')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Search must be between 1 and 100 characters long'),
    query('sortBy')
        .optional()
        .isIn(['id', 'createdAt', 'updatedAt'])
        .withMessage('sortBy must be one of id, createdAt, or updatedAt'),
    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('order must be either asc or desc'),
    query('offset')
        .optional()
        .isInt({ min: 0 })
        .withMessage('offset must be a non-negative integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('limit must be an integer between 1 and 100'),
  ], 'At least one query parameter (search, sortBy, order, offset, limit) is required'),
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

