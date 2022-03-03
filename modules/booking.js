const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({

  Name: {
        type: String,
        required: true},
  age: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,    required: true
  },
  creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

module.exports = mongoose.model('Booking', eventSchema);