import { getAll, getById, create, update, remove } from "../repositories/assignmentsRepo.js";

export async function getAllAssignments(options){
    return getAll(options);
}

export async function getAssignmentById(id){
    const assignment = await getById(id);
    if (assignment) return assignment;
    else{
        const error = new Error(`Assignment ${id} not found`);
        error.status = 404;
        throw error;
    } 
}

export async function createAssignment(assignmentData) {
    return create(assignmentData);
}

export async function updateAssignment(id, updatedData) {
    const updatedAssignment = await update(id, updatedData);
    if(updatedAssignment) return updatedAssignment;
    else{
        const error = new Error(`Assignment ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteAssignment(id){
    const result = await remove(id);
    if(result) return;
    else{
        const error = new Error(`Assignment ${id} not found`);
        error.status = 404;
        throw error;
    }
}