require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/wordlab';

mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        try {
            const user = new User({ name: 'directtest', email: `direct${Date.now()}@example.com`, password: 'password123' });
            await user.save();
            console.log('User saved successfully:', user);
            process.exit(0);
        } catch (err) {
            require('fs').writeFileSync('err.json', JSON.stringify({ message: err.message, stack: err.stack }));
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('Connection failed:', err);
        process.exit(1);
    });
