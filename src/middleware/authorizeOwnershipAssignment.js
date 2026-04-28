import { getAssignmentById } from "../services/assignmentService.js";
import { getCourseById } from "../services/courseService.js";

export async function authorizeOwnership(req, res, next) {
  try {
    const assignmentId = Number(req.params.id);
    const assignment = await getAssignmentById(assignmentId);

    if (!assignment) {
      const error = new Error("Assignment not found");
      error.status = 404;
      return next(error);
    }

  
    const course = await getCourseById(assignment.courseId);

    if (!course) {
      const error = new Error("Course not found");
      error.status = 404;
      return next(error);
    }

    const isTeacherOfCourse = course.userId === req.user.id;

    if (!isTeacherOfCourse) {
      const error = new Error("Forbidden: insufficient permission");
      error.status = 403;
      return next(error);
    }

    return next();
  } catch (err) {
    return next(err);
  }
}