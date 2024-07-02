const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false,
    default: null
  },
  age: {
    type: Number,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  hometown: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    default: ''
  },
  pinterest: {
    type: String,
    default: ''
  },
  instagram: {
    type: String,
    default: ''
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  details_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Details',
    default: null
  },
}, {
  timestamps: true  // Add timestamps option to the schema
});

module.exports = mongoose.model('Sports', sportsSchema);
