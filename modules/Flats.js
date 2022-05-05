const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  flat: {
    unique: true,
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  }
});

const Flats = mongoose.model('Flats', schema);

module.exports = Flats;