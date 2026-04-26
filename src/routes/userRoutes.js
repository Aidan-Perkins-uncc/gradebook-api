import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { getAllUsersHandler, getUserHandler, updateUserHandler, deleteUserHandler, updateUserRoleHandler } from '../controllers/userController.js';
import { validateId, validateSignUp, validateUpdateRole, validateUpdateUser } from '../middleware/userValidators.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('TEACHER'), getAllUsersHandler);
router.get('/:id', authenticate, validateId, getUserHandler);
router.put('/:id/role', authenticate, authorizeRoles('TEACHER'), validateId, validateUpdateRole, updateUserHandler);
router.delete('/:id', authenticate, authorizeRoles('TEACHER'), validateId, deleteUserHandler);

export default router;