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

router.post("/uploadImage", auth.ensureLoggedIn, (req, res) => {
  if (typeof (req.body.image) !== 'string') {
    throw new Error("Can only handle images encoded as strings. Got type: "
      + typeof (req.body.image));
  }
  User.findById(req.user._id).then(user => {
    if (user.imageNames.length >= 3) {
      // don't allow anyone to have more than 3 images (not race condition safe)
      res.status(412).send({
        message: "You can't post a new image! You already have 3!"
      });
    }
    // only start uploading the image once we know we really want to, since
    // uploading costs money! (if you do it too much)
    return uploadImagePromise(req.body.image);
  }).then(imageName => {
    return User.updateOne({ _id: req.user._id },
      { $push: { imageNames: imageName } });
  }).then(user => {
    res.send({}); // success!
  }).catch(err => {
    console.log("ERR: upload image: " + err);
    res.status(500).send({
      message: "error uploading",
    });
  })
});

router.get("/getImages", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    Promise.all(
      user.imageNames.map(imageName => downloadImagePromise(imageName)
        .catch(err => "Err: could not find image"))
    ).then(images => {
      res.send(images);
    }).catch(err => {
      console.log("ERR getImages this shouldn't happen");
      res.status(500).send({
        message: "unknown error"
      });
    });
  });
});

router.post("/deleteImages", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    return Promise.all(user.imageNames.map(imageName => {
      return Promise.all([deleteImagePromise(imageName), Promise.resolve(imageName)])
    }));
  }).then(successesAndNames => {
    // get names of removed images
    return successesAndNames.filter(
      successAndName => successAndName[0]).map(
        successAndName => successAndName[1]);
  }).then((removedNames) => {
    return User.findOneAndUpdate({ _id: req.user._id },
      { $pullAll: { imageNames: removedNames } }); // remove those names from the document
  }).then(user => {
    // success!
    res.send({});
  }).catch(err => {
    console.log("ERR: failed to delete image: " + err);
    res.status(500).send()
  });
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

router.get("/weekshelves", (req, res) => {
  var prevSunday = new Date();
  prevSunday.setDate(prevSunday.getDate() - (prevSunday.getDay() + 7) % 7);
  var month;
  if (prevSunday.getMonth() + 1 < 10) {
    month = "0" + (prevSunday.getMonth() + 1)
  } else {
    month = prevSunday.getMonth() + 1
  }
  const prevSundayDate = prevSunday.getFullYear() + "-" + month + "-" + prevSunday.getDate();
  var weekOrbs = {}
  for (let i = 0; i < 7; i++) {
    var result = new Date(prevSundayDate);
    result.setDate(result.getDate() + i);
    Orb.find({timestamp: startsWith(result)}).then((orbs) => {
      weekOrbs[i] = orbs
    })
  }
  res.send(weekOrbs)
})

router.post("/newmemory", (req, res) => {
  const newOrb = new Orb({
    creator_id: req.body.userId,
    emotion: req.body.emotion,
    content: req.body.content,
    timestamp: Date.now(),
    privacy: req.body.privacy
  });

  newOrb.save().then((orb) => res.send(orb))
});

router.post("/deletememory", (req, res) => {
  Orb.deleteOne({_id: req.body._id})
    .then((orb) => {
      res.send(orb)
    
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

router.get("/getusername", (req, res) => {
  User.findOne({_id: req.query.userId}).then((user) => {
    res.send({username: user.username})
  })
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
