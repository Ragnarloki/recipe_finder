const express = require('express');
const mongoose = require('mongoose');
const { IdModel, User } = require('../models/users'); // Ensure correct path
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
require('dotenv').config(); // Load environment variables
const mongoUrl = process.env.mongoUrl;

// Connect to MongoDB

  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));
// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ username: user.username, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully', token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.username, // Explicitly send the username
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Fetch All Favorites
// Fetch Favorites for a Specific User
app.get('/favorites/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const userFavorites = await IdModel.find({ username });
    res.status(200).json(userFavorites);
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    res.status(500).json({ message: 'Failed to fetch user favorites' });
  }
});

// Add Recipe to Favorites
app.post('/recipe', async (req, res) => {
  const { username, product, thumbnail_url } = req.body;

  try {
    // Check if the recipe is already in the favorites
    const existingFavorite = await IdModel.findOne({ product: product });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Recipe is already in favorites!' });
    }

    // Create a new favorite recipe entry
    const favorite = new IdModel({
      username: username,
      product: product,  // Ensure it matches the field in the schema
      thumbnail: thumbnail_url,  // Ensure this is the correct field from frontend
    });

    // Save the new favorite to the database
    await favorite.save();
    res.status(201).json({ message: 'Recipe added to favorites!' });
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    res.status(500).json({ message: 'Failed to add recipe to favorites.' });
  }
});
// Delete Item
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await IdModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Start Server
app.get('/',(req,res)=>{
  res.send("hello world");
})
app.listen(3000, () => {
  console.log('Server is running');
});
