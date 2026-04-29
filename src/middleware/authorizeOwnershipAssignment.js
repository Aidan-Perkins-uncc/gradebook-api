import { getAssignmentById } from "../services/assignmentService.js";
import { getCourseById } from "../services/courseService.js";

export async function authorizeOwnership(req, res, next) {
 
    const assignmentId = parseInt(req.params.id);
    const assignment = await getAssignmentById(assignmentId);
    const course = await getCourseById(assignment.courseId);
    const isTeacherOfCourse = course.userId === req.user.id;

    if (!isTeacherOfCourse) {
      const error = new Error("Forbidden: insufficient permission");
      error.status = 403;
      return next(error);
    }

    return next();
}