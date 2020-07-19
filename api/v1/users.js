// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route      GET api/v1/users
// @desc       GET a valid user via email and password
// @access     PUBLIC

router.get("/", (req, res) => {
  db.query(selectUser("justin@gmail.com", "replace_password"))
    .then((dbRes) => {
      const user = toSafeParse(toJson(dbRes)); // get response and turn it into json, then parse json to convert to array
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;