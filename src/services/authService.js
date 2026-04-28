import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { create, findByEmail } from '../repositories/userRepo.js';
import { findUserByEmail } from './userService.js';

export async function signUp(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await findUserByEmail(normalizedEmail);

    if(existingUser) {
        const error = new Error('Email has already been used');
        error.status = 409;
        throw error;
    }
    const newUser = await create({name, email, password: hashedPassword });
    return newUser;
}

export async function logIn(email, password) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    const error = new Error('Invalid Credentials');
    error.status = 401;
    const user = await findByEmail(email);
    if(!user) throw error;

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw error;

    const accessToken = jwt.sign({id : user.id, role: user.role }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN,});

    return accessToken;
}