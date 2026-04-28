import { getcommentById } from "../services/commentService.js";

export async function authorizeCommentOwnership(req, res, next) {
  try {
    const commentId = parseInt(req.params.id);
    const comment = await getcommentById(commentId);
    //console.log(comment);

    if (!comment) {
      const error = new Error("Comment not found");
      error.status = 404;
      return next(error);
    }

    if (comment.userId !== parseInt(req.user.id)) {
      const error = new Error("Forbidden: insufficient permission");
      error.status = 403;
      return next(error);
    }

    return next();
  } catch (err) {
    return next(err);
  }
}