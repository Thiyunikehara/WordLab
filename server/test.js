require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/wordlab';
console.log('Testing connection to:', mongoURI);

mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('Connected successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection failed:', err.message);
        process.exit(1);
    });
