import {
  getAllcomments,
  getcommentById,
  createcomment,
  updatecomment,
  deletecomment,
} from '../services/commentService.js';

export async function getAllcommentsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let comments = await getAllcomments(options);
  res.status(200).json(comments);
}

export async function getcommentByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const comment = await getcommentById(id);
  res.status(200).json(comment);
}

export async function createcommentHandler(req, res) {
  const { title, content } = req.body;
  const newcomment = await createcomment({ title, content, authorId: req.user.id });
  res.status(201).json(newcomment);
}

export async function updatecommentHandler(req, res) {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const updatedcomment = await updatecomment(id, { title, content });
  res.status(200).json(updatedcomment);
}

export async function deletecommentHandler(req, res) {
  const id = parseInt(req.params.id);
  await deletecomment(id);
  res.status(204).send();
}
