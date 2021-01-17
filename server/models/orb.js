const mongoose = require("mongoose");

const OrbSchema = new mongoose.Schema({
    creator_id: String, // stores ObjectId
    emotion: String,
    content: String,
    timestamp: Date // correct constructor?
});

// compile model from schema
module.exports = mongoose.model("orb", OrbSchema);