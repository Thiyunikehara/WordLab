require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to DB');
  } catch(e) {
    console.log('Caught connection error:', e.message);
  }
}

run();
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION:', err);
  process.exit(1);
});
