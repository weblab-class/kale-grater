const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  creator_id: String, // stores ObjectId
  name: String,
  googleid: String,
  username: String || null
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
