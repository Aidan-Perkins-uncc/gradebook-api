import express from 'express';
import { validateSignUp, validateLogin } from '../middleware/userValidators.js';
import { signUphandler, logInhandler } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', validateSignUp, signUphandler);
router.post('/login', validateLogin, logInhandler);
export default router;