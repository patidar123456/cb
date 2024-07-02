const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
  full_Name: {
    type: String,
    default: null
  },
  nick_names: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
  weight: {
    type: String,
    default: null
  },
  body_measurements: {
    type: String,
    default: null
  },
  eye_color: {
    type: String,
    default: null
  },
  hair_color: {
    type: String,
    default: null
  },
  dob: {
    type: String,
    default: null
  },
  zodiac_sign: {
    type: String,
    default: null
  },
  food_habit: {
    type: String,
    default: null
  },
  present_address: {
    type: String,
    default: null
  },
  religion: {
    type: String,
    default: null
  },
  signature: {
    type: String,
    default: null
  },
  school: {
    type: String,
    default: null
  },
  college: {
    type: String,
    default: null
  },
  educational_status: {
    type: String,
    default: null
  },
  educational_awards: {
    type: String,
    default: null
  },
  salary: {
    type: String,
    default: null
  },
  net_Worth: {
    type: String,
    default: null
  },
  cars: {
    type: String,
    default: null
  },
  watches: {
    type: String,
    default: null
  },
  passion_behind: {
    type: String,
    default: null
  },
  debut_first_business: {
    type: String,
    default: null
  },
  turning_point: {
    type: String,
    default: null
  },
  first_Success: {
    type: String,
    default: null
  },
  awards_Achievements: {
    type: String,
    default: null
  },
  food: {
    type: String,
    default: null
  },
  actor_actress: {
    type: String,
    default: null
  },
  musicians: {
    type: String,
    default: null
  },
  singers: {
    type: String,
    default: null
  },
  songs: {
    type: String,
    default: null
  },
  books: {
    type: String,
    default: null
  },
  hobbies: {
    type: String,
    default: null
  },
  films: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  perfume: {
    type: String,
    default: null
  },
  holiday_destinations: {
    type: String,
    default: null
  },
  cars: {
    type: String,
    default: null
  },
  cars_name: {
    type: String,
    default: null
  },
  watches: {
    type: String,
    default: null
  },
  watches_name: {
    type: String,
    default: null
  },
  father: {
    type: String,
    default: null
  },
  father_name: {
    type: String,
    default: null
  },
  mother: {
    type: String,
    default: null
  },
  mother_name: {
    type: String,
    default: null
  },
  siblings: {
    type: String,
    default: null
  },
  siblings_name: {
    type: String,
    default: null
  },
  spouse: {
    type: String,
    default: null
  },
  spouse_name: {
    type: String,
    default: null
  },
  children: {
    type: String,
    default: null
  },
  children_name: {
    type: String,
    default: null
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  slides: {
    type: Array,
    default: null
  },
  references: {
    type: Array,
    default: null
  },
}, {
  timestamps: true  // Add timestamps option to the schema
});

module.exports = mongoose.model('Details', DetailSchema);
