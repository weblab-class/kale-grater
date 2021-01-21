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
router.get("/shelves", (req, res) => {
  Orb.find({creator_id: req.user._id}).then((orbs) => {
    res.send(orbs);
  });
});

router.post("/newmemory", (req, res) => {
  const newOrb = new Orb({
    creator_id: req.body.userId,
    emotion: req.body.emotion,
    content: req.body.content,
    timestamp: Date.now()
  });

  newOrb.save().then((orb) => res.send(orb))
});



router.post("/newuser", (req, res) => {
  console.log('IN POST REQUEST');
  User.find({username: req.body.username}).then((users) => {
    if (users.length !== 0) {
      console.log('BRUH');
      res.send({message: "error, username taken"});
    } else {
      const newUser = new User({
        creator_id: req.user.creator_id,
        name: req.user.name,
        googleid: req.user.googleid,
        username: req.body.username
      });
        // req.user.username = req.body.username;
        // console.log(user);
        // req.user.username = req.body.username
        newUser.save().then(() => {
        res.send({message: "success"})
      });
    }});
  })





// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
