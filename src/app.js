require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const opdRoutes = require('./routes/opd.routes');

const app = express();
app.use(express.json());

connectDB();   // DB connect

app.use('/api/opd', opdRoutes);

module.exports = app;   // ✅ export only (NO app.listen)
