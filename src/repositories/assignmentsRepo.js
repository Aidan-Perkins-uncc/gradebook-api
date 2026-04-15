import prisma from '../config/db.js';

export async function getAll({ /* params */ }) {
    const conditions = {};
    // condition logic
    const assignments = await prisma.assignments.findMany({ /* condition logic */ });
    return assignments;
}

export async function getById(id){
    const assignment = await prisma.assignments.findUnique({ where: { id } });
    return assignment;      
}

export function create(assignmentData) {
    const newAssignment = prisma.assignments.create({ data: assignmentData });
    return newAssignment;
}

export async function update(id, updatedData){
    try{
        const updatedAssignment = await prisma.assignments.update({
            where: { id },
            data: updatedData,
        });
        return updatedPost;
    } catch (error) {
        if(error.code === 'P2025') return null;
        throw error;
    }
}

export async function remove(id){
    try {
        const deletedAssignment = await prisma.assignments.delete({
            where: { id },
        });
        return deletedAssignment;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}