const User= require('../models/User');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
  const { login: { emp_id, password } } = req.body;

  const user = await User.findOne({ "login.emp_id": emp_id });
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const isValid = await bcrypt.compare(password, user.login.password);
  if (!isValid) {
    return res.status(403).json({ message: 'Wrong password' });
  }

  req.session.user = {
    emp_id: user.login.emp_id,
    name: user.login.name,
    role: user.role,
    zone: user.zone
  };

  res.status(200).json({ redirect: `/etl/user/${user.login.emp_id}/home` });
};

exports.renderHome = async (req, res) => {
  const { emp_id } = req.params;

  const user = await User.findOne({ "login.emp_id": emp_id });
  if (!user) return res.status(404).send("User not found");

  res.sendFile(path.join(__dirname, '../../frontend/home.html'));
};