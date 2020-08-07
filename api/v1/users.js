// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const allUsers = require("../../queries/allUsers");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");
const insertUser = require("../../queries/insertUser");
const insertXrefUserTech = require("../../queries/insertXrefUserTech");
const { v4: getUuid } = require("uuid");

// @route      GET api/v1/users
// @desc       GET a valid user via email and password
// @access     PUBLIC

router.get("/", (req, res) => {
  // console.log(req.query);
  db.query(allUsers)
    .then((dbRes) => {
      const users = toSafeParse(toJson(dbRes)); // get response and turn it into json, then parse json to convert to array
      console.log(users);
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// @route      POST api/v1/users
// @desc       Create a new user
// @access     PUBLIC
router.post("/", async (req, res) => {
  const user = {
    id: req.body.id,
    handle: req.body.handle,
    email: req.body.email,
    password: await toHash(req.body.password),
    gender: req.body.gender,
    created_at: req.body.createdAt,
  };

  const userXrefTech1 = {
    id: getUuid(),
    user_id: req.body.id,
    technology_id: req.body.techInterestedIn[0].id,
  };

  const userXrefTech2 = {
    id: getUuid(),
    user_id: req.body.id,
    technology_id: req.body.techInterestedIn[1].id,
  };

  const userXrefTech3 = {
    id: getUuid(),
    user_id: req.body.id,
    technology_id: req.body.techInterestedIn[2].id,
  };
  console.log(user);
  db.query(insertUser, user)
    .then((dbRes) => {
      db.query(insertXrefUserTech, userXrefTech1)
        .then((res) => {
          db.query(insertXrefUserTech, userXrefTech2)
            .then((res) => {
              db.query(insertXrefUserTech, userXrefTech3)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(dbRes);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
