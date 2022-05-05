const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  day: {
    type: Date,
    required: true
  },
  hour: {
    type: Schema.Types.String,
    required: true
  },
  flat: {
    type: Schema.Types.ObjectId,ref:'Flats',
    required: true
  },
});

const Books = mongoose.model('Books', schema);

module.exports = Books;