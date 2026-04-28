import prisma from '../config/db.js';

export async function create(data) {
    try{
        const newUser = await prisma.users.create({
            data,
            omit: { password: true},
        });
        return newUser;
    } catch (error) {
        if(error.code === 'P2002') {
            const err = new Error('Email has already been used');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function findByEmail(email) {
    return prisma.users.findUnique({ where: { email } });
}

export async function findById(id) {
    try{
        return await prisma.users.findUniqueOrThrow({ where: { id } });
    } catch (error) {
        if (error.code === 'P2025') {
            const err = new Error(`User ${id} not found`);
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function getAll() {
    return prisma.users.findMany({omit: {password: true}});
}

export async function update(id, data) {
    try {
        const updatedUser = await prisma.users.update({
            where: { id },
            data,
            omit: { password: true },
        });
        return updatedUser;
    } catch (error) {//console.log(error)
        if (error.code === 'P2025') {
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }
        throw error;
    }      
    
}

export async function remove(id) {
    try {
        await prisma.users.delete({ where: { id } });
    } catch (error) {
        if (error.code === 'P2025') {
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }
        throw error;
    }
}