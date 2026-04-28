import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { getAllUsersHandler, getUserHandler, updateUserHandler, deleteUserHandler, updateUserRoleHandler, getUserByIdHandler } from '../controllers/userController.js';
import { validateId, validateSignUp, validateUpdateUserRole, validateUpdateUser } from '../middleware/userValidators.js';
import { authorizedRoles } from '../middleware/authRoles.js';
const router = express.Router();

router.get('/', authenticate, authorizeRoles('TEACHER'), getAllUsersHandler);
router.get('/:id', authenticate, validateId, getUserByIdHandler);
router.put('/:id', authenticate, authorizeRoles('TEACHER'), validateUpdateUser, updateUserHandler);
router.put('/:id/role', authenticate, authorizedRoles('TEACHER'), validateId, validateUpdateUserRole, updateUserRoleHandler);
router.delete('/:id', authenticate, authorizedRoles('TEACHER'), validateId, deleteUserHandler);

export default router;