const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/books');
const path = require('path');
const port = 5000;

dotenv.config();


const app = express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/todos', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a new book
app.post('/add-book', async (req, res) => {
  const { name } = req.body;
  const newBook = new Book({ name });
  await newBook.save();
  res.status(201).json(newBook);  
});


app.post('/edit-book/:id', async (req, res) => {
  const bookId = req.params.id;
  const { name } = req.body;

  
  const updatedBook = await Book.findByIdAndUpdate(bookId, { name }, { new: true });
  res.status(200).json(updatedBook);
});


app.post('/return-book/:id', async (req, res) => {
  const bookId = req.params.id;
  await Book.findByIdAndDelete(bookId);
  res.status(200).send('Book returned');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
