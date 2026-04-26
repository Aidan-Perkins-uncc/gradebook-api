import {
    getAll,
    getById,
    create,
    update,
    remove,
} from '../repositories/commentRepo.js';

export async function getAllcomments(options) {
  return getAll(options);
}

export async function getcommentById(id) {
  const comment = await getById(id);
  if (comment) return comment;
  else {
    const error = new Error(`comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createcomment(commentData) {
  return create(commentData);
}

export async function updatecomment(id, updatedData) {
  const updatedcomment = await update(id, updatedData);
  if (updatedcomment) return updatedcomment;
  else {
    const error = new Error(`comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deletecomment(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}
