const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const AccesRoutes = require('./routes/AccesRoutes');
const historyRoutes = require('./routes/historyRoutes');


const app = express();
const cors = require('cors');
app.use(cors());

require('dotenv').config();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/', AccesRoutes);
app.use('/api/history',historyRoutes );



app.get('/', (req, res) => res.send('API is running...'));

module.exports = app;
