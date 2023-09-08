const mongoose = require('mongoose');


const uri = 'mongodb+srv://mahmood68:i0Wi9om5ExZ0z3KV@cluster0.o0kezwy.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;