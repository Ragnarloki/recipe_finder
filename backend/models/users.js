const mongoose = require('mongoose');

const IdSchema = new mongoose.Schema({
    product: String,
    thumbnail: String,
    username:String
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Models
const User = mongoose.model('User', userSchema);
const IdModel = mongoose.model('IdModel', IdSchema); // Renamed to match the model's purpose

// Export both models
module.exports = { IdModel, User };
