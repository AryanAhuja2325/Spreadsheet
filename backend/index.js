const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const workbookRoutes = require('./routes/workbookRoutes');
const sheetRoutes = require('./routes/sheetRoutes');

dotenv.config();

app.use(cors());
app.use(express.json())
connectToDB();

const PORT = process.env.PORT || 8000;

app.use('/api/users', userRoutes);
app.use('/api/workbooks', workbookRoutes);
app.use('/api/sheets', sheetRoutes);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})

