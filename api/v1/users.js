// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const allUsers = require("../../queries/allUsers");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");

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
  const user = req.body;
  user.password = await toHash(user.password); // await hashed passoword
  console.log(user);
});

module.exports = router;
