const mongoose = require('mongoose');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect("mongodb+srv://clestrix:clestrix@clestrix.3qf5hyk.mongodb.net/?retryWrites=true&w=majority&appName=Clestrix", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to MongoDB');
      resolve();
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
      reject(error);
    });
  });
};

module.exports = { connectDB };
