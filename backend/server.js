const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const env= process.env;
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const {requireLogin}= require('./utils/auth');
const path = require('path');

dotenv.config();
connectDB(env);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'frontend')));

app.use(session({
  secret: env.secret_key,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use('/etl/user', userRoutes);
app.use('/etl/user/:emp_id/complaint', requireLogin, complaintRoutes);
app.use('/etl/user/:emp_id/maintenance', requireLogin, maintenanceRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));