exports.requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized: Please login');
  }

  if (req.params.emp_id && parseInt(req.params.emp_id) !== req.session.user.emp_id) {
    return res.status(403).send('Forbidden: Invalid user access');
  }

  next();
};
