import {
  getAllComments,
  getcommentById,
  createcomment,
  updatecomment,
  deletecomment,
} from '../services/commentService.js';

export async function getAllCommentsHandler(req, res) {
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
  let comments = await getAllComments(options);
  res.status(200).json(comments);
}

export async function getCommentByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const comment = await getcommentById(id);
  res.status(200).json(comment);
}

export async function createCommentHandler(req, res) {
  const { content, assignmentId } = req.body;
  const userId = req.user.id;
  const newcomment = await createcomment({ content, assignmentId, userId });
  res.status(201).json(newcomment);
}

export async function updateCommentHandler(req, res) {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  const updatedcomment = await updatecomment(id, { content });
  res.status(200).json(updatedcomment);
}

export async function deleteCommentHandler(req, res) {
  const id = parseInt(req.params.id);
  await deletecomment(id);
  res.status(204).send();
}
