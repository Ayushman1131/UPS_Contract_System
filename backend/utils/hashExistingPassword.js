const User = require('../models/User');
const bcrypt = require('bcrypt');

async function hashExistingPasswordsOnce() {
  const users = await User.find();

  for (const user of users) {
    const pwd = user.login?.password;

    if (pwd && !pwd.startsWith('$2')) {
      user.login.password = await bcrypt.hash(pwd, 10);
      await user.save();
      console.log(`Hashed password for emp_id: ${user.login.emp_id}`);
    }
  }

  console.log('Existing password hashing done.');
}

module.exports = hashExistingPasswordsOnce;
