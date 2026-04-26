export function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    if (allowedRoles.includes(req.user.role)) {
      return next();
    } else if (req.user.id === req.params.id) {
      return next();
    } else {
      const error = new Error('Forbidden: insufficient permission');
      error.status = 403;
      return next(error);
    }
  };
}