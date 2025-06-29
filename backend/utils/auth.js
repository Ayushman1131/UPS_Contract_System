exports.requireLogin = (req, res, next) => {
  if (!req.session || !req.session.user || !req.params.emp_id) {
    return res.status(401).send('Unauthorized: Please log in');
  }
  next();
};