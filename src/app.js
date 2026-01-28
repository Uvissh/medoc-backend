require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const opdRoutes = require('./routes/opd.routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/opd', opdRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OPD Engine running on port ${PORT}`);
});

