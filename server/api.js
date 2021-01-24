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
// const Friends = require("./models/friends");

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
  // Orb.find({creator_id: req.user._id}).then((orbs) => {
  //   res.send(orbs);
  // });
  Orb.find({creator_id: req.query.userId}).then((orbs) => {
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

router.post("/deletememory", (req, res) => {
  Orb.deleteOne({_id: req._id})
    .then((err) => {
      if(err) return console.log(err);
      console.log("Deleted");
    });
});

router.post("/newuser", (req, res) => {
  User.find({username: req.body.username}).then((users) => {
    if (users.length !== 0) {
      res.send({message: "error, username taken"});
    } else {

      User.updateOne({_id: req.user._id}, {username: req.body.username}).then(() => {
        res.send({message: "success"});
      });
    }});
  });


router.get("/friends", (req, res) => {
  User.findOne({_id: req.user._id}).then((user) => {
    res.send({friends: user.friends});
  })
})

router.post("/social", (req, res) => {
  User.findOne({username: req.body.username}).then((user) => {
    if (user === null) {
      res.send({message: "failure"})
    } else {
      if (req.user.friends.includes(req.body.username)) {
        res.send({message: "already friended"})
      } else {
        if (req.user.username === req.body.username) {
          res.send({message: "self"})
        } else {
            res.send({
              creator_id: user._id,
              name: user.name,
              googleid: user.googleid,
              username: user.username,        
            });
        };
      };
      // User.findOne({username: {$in: req.user.friends}}).then((user) => {
      //   if (user !== null) {
      //     res.send({message: "already friended"})
      //   } else {
      //     if (req.user.username === req.body.username) {
      //       res.send({message: "self"})
      //     } else {
      //           res.send({
      //             creator_id: user._id,
      //             name: user.name,
      //             googleid: user.googleid,
      //             username: user.username,
      //             // message: "success"
      //           })
      //       }}
      //     })
        }
      })
    }
    )
      // res.send({
      //   creator_id: user._id,
      //   name: user.name,
      //   googleid: user.googleid,
      //   username: user.username,
      //   // message: "success"
      // })

//   });
// });

router.post("/addfriend", auth.ensureLoggedIn, (req, res) => {
  // console.log('hi', req.body.friend);
  User.updateOne({_id: req.user._id}, {$push: {friends: req.body.username}}).then(() => {
    // res.send({friends: user.friends});
    // console.log(user);
    User.findOne({_id: req.user._id}).then((user) => {
      res.send({friends: user.friends});
    }
    )
  });
  // })
});

router.post("/social/shelves", (req, res) => {
  User.findOne({username: req.body.username}).then((user) => {
    res.send({friend: user});
  });
});

router.get("/user", (req, res) => {
  if (req.user._id === req.query.userId) {
    res.send({message: "self"})
  } else {
    res.send({message: "friend"})
  }
});

router.get("/checkusername", (req, res) => {
  if (!req.user.username) {
    res.send({message: "no username"})
  } else {
    res.send({message: "username"})
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
