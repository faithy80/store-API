const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  quantity: {
    type: Number,
    required: false,
    default: 1,
  },
  location: {
    type: Boolean,
    required: true,
  },
  image: {
    type: Buffer,
    contentType: String,
    required: false,
    default: '',
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = { Item };
