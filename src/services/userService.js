import {create,
findByEmail,
findById,
getAll,
update,
remove
} from '../repositories/userRepo.js';

export async function createUser(data) {
    return create(data);
}

export async function findUserByEmail(email) {
    return findByEmail(email);
}

export async function findUserById(id) {
    const user = await findById(id);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    return user;
}

export async function getAllUsers() {
    return getAll();
}

export async function updateUser(id, data) {
    return update(id, data);
}

export async function deleteUser(id) {
    return remove(id);
}

export async function updateUserRole(id, role) {
    return update(id, { role });
}