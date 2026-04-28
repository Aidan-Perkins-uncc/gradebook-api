import { handleValidationErrors } from './handleValidationErrors.js';
import { body, param, oneOf } from 'express-validator';

export const validateSignUp = [
  body('name')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters long'),
  
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters',
    ),

  body('role')
    .optional()
    .isIn(['USER', 'TEACHER'])
    .withMessage('Role must be either USER or TEACHER'),

  handleValidationErrors,
];

export const validateLogin = [
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),

  handleValidationErrors,
];

export const validateId = [
    param('id')
        .trim()
        .escape()
        .isInt({min: 1})
        .bail()
        .withMessage("ID must be a positive Integer"),
]


export const validateUpdateUserRole = [
    param('id')
        .exists({values: 'falsy'})
        .isInt(),
    body('role')
        .exists({values: 'falsy'})
        .withMessage('Role must exist')
        // .bail()
        .isIn(['TEACHER','USER'])
        .withMessage('Must be TEACHER or USER'),
        handleValidationErrors,
];
//  change to TEACHER and USER when we have the role implemented + add name filed
export const validateUpdateUser = [
    oneOf([
    body('name').exists({values: 'falsy'}),
    body('email').exists({values: 'falsy'}),
    body('password').exists({values: 'falsy'})
  ], {message: 'At least one field (email or password) must be provided'}),

  body('name')
    .optional()
    .isLength({min:2, max:20})
    .withMessage('Name must be between 2 and 20 characters'),



  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail({ all_lowercase: true }),

  body('password')
    .optional()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must contain at least 8 characters and at most 64 characters'),

  body('role')
    .optional()
    .isIn(['TEACHER', 'USER']),
    handleValidationErrors,
];

