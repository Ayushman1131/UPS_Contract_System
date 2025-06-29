const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const env= process.env;
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const contractRoutes = require('./routes/contractRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const upsRoutes = require('./routes/upsRoutes');
const {requireLogin}= require('./utils/auth');

dotenv.config();
connectDB(env);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data

app.use(session({
  secret: 'zxcvbnmlkjhgfdsaqwertyuiop', // change this in production!
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// app.use('/', express.static('frontend'));
app.use('/etl/user', userRoutes);
// app.use('/etl/user/:emp_id',userRoutes);
app.use('/etl/user/:emp_id/complaint', requireLogin, complaintRoutes);
// app.use('/etl/user/:emp_id/contract', contractRoutes);
app.use('/etl/user/:emp_id/maintenance', requireLogin, maintenanceRoutes);
// app.use('/etl/user/:emp_id/ups', upsRoutes);
// app.use('/', express.static('frontend'));
// app.use('/etl/user', userRoutes);
// app.use('/etl/user/:emp_id',userRoutes);
// app.use('/etl/user/:emp_id/complaint', complaintRoutes);
// app.use('/etl/user/:emp_id/contract', contractRoutes);
// app.use('/etl/user/:emp_id/maintenance', maintenanceRoutes);
// app.use('/etl/user/:emp_id/ups', upsRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));