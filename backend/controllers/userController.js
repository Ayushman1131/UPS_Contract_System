const session = require('express-session');
const User= require('../models/User');
const path = require('path');
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

  res.redirect(`/etl/user/${user.login.emp_id}/home`);
};

exports.renderHome = async (req, res) => {
<<<<<<< ayushman
  const emp_id = req.session.user.emp_id;
=======
  req.params.emp_id;
>>>>>>> main

  const user = req.session.user;

  if (!user || user.emp_id !== emp_id) {
    return res.status(403).send("Unauthorized access");
  }
  res.sendFile(path.join(__dirname, '../../frontend/home.html'))
};

// exports.renderFeature = async (req, res) => {
//   if (session.user.role == 'EIC') {
//     return res.sendFile(path.join(__dirname, `../../frontend/${req.params.feature}.html`));
//   }

<<<<<<< ayushman
//   if (session.user.role == 'ESI') {
//     return res.sendFile(path.join(__dirname, `../../frontend/${req.params.feature}.html`));
//   }
// };
=======
  res.sendFile(path.join(__dirname, '../../frontend/home.html'));
};

exports.renderFeature = async (req, res) => {
  if (session.user.role == 'EIC') {
    return res.sendFile(path.join(__dirname, `../../frontend/${req.params.feature}.html`));
  }

  if (session.user.role == 'ESI') {
    return res.sendFile(path.join(__dirname, `../../frontend/${req.params.feature}.html`));
  }
};
>>>>>>> main
