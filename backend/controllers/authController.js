const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username});

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", username: user.username, password: user.password });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };