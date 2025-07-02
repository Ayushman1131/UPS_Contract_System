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

exports.logoutUser = (req, res) => {
  req.session?.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    res.clearCookie('connect.sid', {
      path: '/',
    });

    res.redirect('/');
  });
};
exports.renderHome = async (req, res) => {
  const emp_id = req.session.user.emp_id;
  
  if (!emp_id) {
    return res.status(403).send("Unauthorized access");
  }
  res.sendFile(path.join(__dirname, '..','..','frontend','home.html'))
};

exports.renderLogin = async (req, res) => {
    res.sendFile(path.join(__dirname,'..','..','frontend','login.html'));
};

exports.sessionCheck = async (req, res) => {
  const accepts = req.get('Accept');

  if (!accepts || !accepts.includes('application/json')) {
    return res.status(403).send("Forbidden");
  }
  
  if (!req.session.user) {
    return res.status(403).json({ message: 'No session found' });
  }
  res.json(req.session.user);
};