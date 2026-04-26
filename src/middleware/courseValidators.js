import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
    param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),
    handleValidationErrors,
];

export const validateCreateCourse = [
    body('name')
    .exists({values: 'falsy'})
    .withMessage('Course name is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min:3 })
    .withMessage('Course name must be at least 3 characters long'),

    body('description')
    .exists({values: 'falsy'})
    .withMessage('Course description is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Course description must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Course description must be at least 10 characters long'),

    body('department')
    .exists({values: 'falsy'})
    .withMessage('Course department is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Course department must be a string')
    .bail()
    .isLength({ min: 3, max: 4})
    .withMessage('Course department must be between 3 and 4 characters long'),
    handleValidationErrors,

];

export const validateUpdateCourse = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
      body('department').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (name, department, description) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters'),

  body('description')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('description must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('description must be at least 10 characters'),

  body('department')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('department must be a string')
    .bail()
    .isLength({ min: 3, max: 4 })
    .withMessage('department must be between 3 and 4 characters'),

  handleValidationErrors,
];

export const validateCourseQuery = [
    query('sortBy')
    .optional()
    .isIn(['id', 'name', 'description', 'department'])
    .withMessage('sortBy must be one of id, name, description, department'),

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
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be an integer between 1 and 50'),

  handleValidationErrors,
];