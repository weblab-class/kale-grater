const mongoose = require("mongoose");

const OrbSchema = new mongoose.Schema({
    user_id: String,
    user_name: String,
    emotion: String,
    content: String,
    images: String, // url??
    timestamp: Date // correct constructor?
});

// compile model from schema
module.exports = mongoose.model("orb", OrbSchema);