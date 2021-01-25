const mongoose = require("mongoose");

const OrbSchema = new mongoose.Schema({
    creator_id: String, // stores user's ObjectId
    emotion: String,
    content: String,
    timestamp: Date, // correct constructor?,
    privacy: null || String
});

// compile model from schema
module.exports = mongoose.model("orb", OrbSchema);