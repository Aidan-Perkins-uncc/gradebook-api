import { getCourseById } from "../services/courseService.js";

export async function authorizeCourseTeacher(req, res, next) {
  try {
    const courseId = parseInt(req.params.id); 
    

    const course = await getCourseById(courseId);

    if (!course) {
      const error = new Error("Course not found");
      error.status = 404;
      return next(error);
    }

    if (course.userId !== req.user.id) {
      const error = new Error("Forbidden: only the course teacher can create assignments");
      error.status = 403;
      return next(error);
    }

    return next();
  } catch (err) {
    return next(err);
  }
}