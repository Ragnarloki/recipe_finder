const express = require('express');
const mongoose = require('mongoose');
const { IdModel, User } = require('./models/users'); // Ensure correct path
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors()); // Allow all origins, adjust for production
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://siva:siva1234@cluster0.kpwvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

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
  const { username,id, thumbnail_url } = req.body;

  try {
    const existingFavorite = await IdModel.findOne({ recipeId: id });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Recipe is already in favorites!' });
    }

    const favorite = new IdModel({
      username:username,
      recipeId: id,
      thumbnail: thumbnail_url,
    });

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
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
