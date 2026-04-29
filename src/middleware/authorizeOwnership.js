import {getCourseById} from '../services/courseService.js';


export  async function authorizeOwnership(req, res, next) {

    const courseId = parseInt(req.params.id, 10);
    const course = await getCourseById(courseId);

    if (!course) {
      const error = new Error("Course not found");
      error.status = 404;
      return next(error);
    }

    if (course.userId !== req.user.id) {
      const error = new Error("Forbidden: insufficient permission");
      error.status = 403;
      return next(error);
    }

    return next();
} 
