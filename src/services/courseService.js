import { 
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    removeCourse,
 } from "../repositories/coursesRepo";

export async function getAllCourses(options){
    return getAll(options);
 }

export async function getCourseById(id){
    const course = await getById(id);
    if(course) return course;
    else{
        const error = new Error(`Course ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createCourse(courseData){
    return create(courseData);
}

export async function updateCourse(id, updatedData) {
    const updatedCourse = await update(id, updatedData);
    if(updatedCourse) return updatedCourse;
    else {
        const error = new Error(`Course ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function deleteCourse(id){
    const result = await remove(id);
    if(result) return;
    else{
        const error = new Error(`Course ${id} not found`);
        error.status = 404;
        throw error;
    }
}
