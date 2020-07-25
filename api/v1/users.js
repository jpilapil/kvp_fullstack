// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const allUsers = require("../../queries/allUsers");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route      GET api/v1/users
// @desc       GET a valid user via email and password
// @access     PUBLIC

router.get("/", (req, res) => {
  db.query(allUsers)
    .then((dbRes) => {
      const users = dbRes; // get response and turn it into json, then parse json to convert to array
      console.log(users);
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
