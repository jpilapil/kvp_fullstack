// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const allUsers = require("../../queries/allUsers");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");
const insertUser = require("../../queries/insertUser");

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

  console.log(user);
  db.query(insertUser, user)
    .then((dbRes) => {
      console.log(dbRes);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
