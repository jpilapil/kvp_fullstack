// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const allUsers = require("../../queries/allUsers");
// const { toJson, toSafeParse } = require("../../utils/helpers");

// @route      GET api/v1/users
// @desc       GET all users
// @access     PUBLIC

router.get("/", (req, res) => {
  db.query(allUsers)
    .then(() => {
      const user = res.data;
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
