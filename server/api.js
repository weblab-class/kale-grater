/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Orb = require("./models/orb");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|


// get request for getting orbs in shelf
router.get("/shelf", (req, res) => {
  Orb.find({user_id: req.query.user_id}).then((orbs) => {
    res.send(orbs);
  });
});


// this whole thing is supper iffy
router.post("/newuser", (req, res) => {
  User.find({userName: req.body.username}).then((users) => {
    if (length(users) !== 0) {
      navigate("/newuser")
    } else {
      const newUser = new User({
        name: req.user._id,
        username: req.body.username
      });
      newUser.save().then(navigate("/home"));
    }
  })

});




// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
