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
    return findById(id);
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