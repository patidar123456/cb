const express = require('express');
// const session = require('express-session')
const multer = require('multer');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const dotenv = require('dotenv');
dotenv.config();
const momentTimeZone = require('moment-timezone');
momentTimeZone.tz.setDefault('Asia/Kolkata');

app.use((req, res, next) => {
  const maxPayloadSize = 50 * 1024 * 1024; // 25MB in bytes
  // Check if the request payload size exceeds the limit
  if (req.headers['content-length'] > maxPayloadSize) {
    return res.status(413).json({ status: false, response_code: 413, message: 'Payload size exceeds the limit (50MB)', data: [] });
  }
  // If the payload size is within the limit, proceed to the next middleware
  next();
});
app.use(bodyParser.json({ limit: '50mb' }));

// --- Web Routes ---
const categoriesRoute = require('./api/web/routes/categoriesRoute');
const emailRoute = require('./api/web/routes/emailRoute');

connectDB();

app.set("view engine", "ejs");

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000'],
}));

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));

// --- Web Routes ---
app.use('/category', categoriesRoute);
app.use('/email', emailRoute);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.get("/", (req, res) => {
  res.send(`🚀 Server started on http://${HOST}:${PORT} 🚀`);
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server started on http://${HOST}:${PORT} 🚀`);
});
