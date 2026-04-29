import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../services/courseService.js';

export async function getAllCoursesHandler(req, res, next) {
    try{
    const { sortBy, order, offset, limit } = req.query;
    const courses = await getAllCourses({ sortBy, order, offset, limit });
    res.status(200).json(courses);
    } catch (error){
        next(error);
    }
}

export async function getCourseByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const course = await getCourseById(id);
    res.status(200).json(course);
}

export async function createCourseHandler(req, res) {
    const { title, department, description } = req.body;
    const newCourse = await createCourse({ title, department, description, userId: req.user.id });
    res.status(201).json(newCourse);
}

export async function updateCourseHandler(req, res){
    const id = parseInt(req.params.id);
    const { title, department, description } = req.body;
    const updatedCourse = await updateCourse(id, { title, department, description });
    res.status(200).json(updatedCourse);
}

export async function deleteCourseHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteCourse(id);
    res.status(204).send();
}