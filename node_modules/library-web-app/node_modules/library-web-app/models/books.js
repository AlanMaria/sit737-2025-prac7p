

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['checked out', 'returned'],
    default: 'checked out',
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

