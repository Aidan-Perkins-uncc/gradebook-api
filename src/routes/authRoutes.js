import express from 'express';
import { validateSignUp, validateLogin } from '../middleware/userValidators.js';
import { signupHandler, logInHandler } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', validateSignUp, signUpHandler);
router.post('/login', validateLogin, logInhandler);
export default router;