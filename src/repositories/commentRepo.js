import prisma from '../config/db.js'

export async function getAll({ search, sortBy, order, offset, limit }){
   const conditions = {};
  if (search) {
    conditions.content = { contains: search, mode: 'insensitive'};
  }
  const comments = await prisma.comments.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return comments;
}

export async function getById(id) {
  const comment = await prisma.comments.findUnique({ where: { id } });
  return comment;
}

export async function create(commentData) {
  try{
    const newcomment = await prisma.comments.create({ data: commentData });
    return newcomment;
  } catch (error) {
    if(error.code === 'P2003') {
      const error = new Error(`Cannot create comment: referenced assignment with id ${commentData.assignmentId} does not exist.`);
      error.status = 400;
      throw error;
    }
    throw error;
  }
}

export async function update(id, updatedData) {
  try {
    const updatedcomment = await prisma.comments.update({
      where: { id },
      data: updatedData,
    });
    return updatedcomment;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedcomment = await prisma.comments.delete({
      where: { id },
    });
    return deletedcomment;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
