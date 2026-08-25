require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://nova-bridge-taupe.vercel.app',  // Vercel production
  /\.vercel\.app$/,                          // All Vercel preview deployments
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server (no origin) and matched origins
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (allowed) return callback(null, true);
    callback(new Error(`CORS not allowed for origin: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());

// Register API Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serve static assets in production (from dist folder)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'NovaBridge backend is running' });
});

// Root greeting endpoint & static fallback
app.get('*', (req, res) => {
  // If request is for API, return 404
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API Route Not Found' });
  }
  // Try sending the React built file
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.send('NovaBridge Express Server is running! Front-end assets are not built yet.');
    }
  });
});

// Database connection — server will NOT start if MongoDB is unreachable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('FATAL: MONGODB_URI environment variable is not set. Server cannot start.');
  process.exit(1);
}

// Log only the host part, never the password
try {
  const url = new URL(MONGODB_URI);
  console.log('Connecting to MongoDB host:', url.hostname);
} catch (_) {
  console.log('Connecting to MongoDB...');
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, () => {
      console.log(`NovaBridge backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection FAILED:', err.message);
    console.error('Check MONGODB_URI in Render environment variables.');
    process.exit(1); // Crash fast — don't serve requests without DB
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error handler:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

