import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../services/courseService.js';

export async function getAllCoursesHandler(req, res) {
    const {
        // search params with default values
    } = req.query;

    const options = {
        // available parameters
    };
    let courses = await getAllCourses(options);
    res.status(200).json(courses);
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
    const id = parseint(req.params.id);
    const { title, department, description } = req.body;
    const updatedCourse = await updateCourse(id, { title, department, description });
    res.status(200).json(updatedCourse);
}

export async function deleteCourseHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteCourse(id);
    res.status(204).send();
}