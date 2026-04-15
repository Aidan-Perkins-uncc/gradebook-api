import { signUp, logIn } from '../services/authService.js';

export async function signUphandler(req, res){
    const { name, email, password } = req.body;
    const newUser = await signUp(name, email, password);
    res.status(201).json(newUser);
}

export async function logInhandler(req, res) {
    const { email, password } = req.body;
    const accessToken = await logIn(email, password);
    res.status(200).json({ accessToken });
}