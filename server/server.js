require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const toolRoutes = require('./routes/toolRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('WordLab API is running');
});

// Database connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/wordlab';
mongoose.set('bufferCommands', false);

async function startDatabaseAndServer() {
  try {
    console.log('Attempting to connect to primary MongoDB Configuration...');
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error('=========================================');
    console.error('MongoDB Primary Connection Error!');
    console.error('Your network is blocking port 27017 or DNS SRV records.');
    console.error('Error Details:', err.message);
    console.error('=========================================');
    
    console.log('\n🌟 [FALLBACK] Launching local In-Memory Database for testing because your connection is blocked...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const memoryURI = mongoServer.getUri();
      await mongoose.connect(memoryURI);
      console.log(`🌟 [FALLBACK] In-Memory MongoDB connected successfully at ${memoryURI}`);
      
      app.listen(PORT, () => console.log(`Server is running on port ${PORT} (Using In-Memory DB)`));
    } catch (fallbackErr) {
      console.error('Failed to start fallback Memory Database. Exiting.');
      console.error(fallbackErr);
      process.exit(1);
    }
  }
}

startDatabaseAndServer();
