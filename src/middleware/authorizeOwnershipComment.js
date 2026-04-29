import { getcommentById } from "../services/commentService.js";

export async function authorizeCommentOwnership(req, res, next) {

    const commentId = parseInt(req.params.id);
    const comment = await getcommentById(commentId);
    //console.log(comment);


    if (comment.userId !== parseInt(req.user.id)) {
      const error = new Error("Forbidden: insufficient permission");
      error.status = 403;
      return next(error);
    }

    return next();
}