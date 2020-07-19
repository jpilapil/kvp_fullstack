// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const searchUsers = require("../../queries/searchUsers");
// const { toJson, toSafeParse } = require("../../utils/helpers");

// @route      GET api/v1/all-users
// @desc       GET all users by search term and order
// @access     PUBLIC

router.get("/", (req, res) => {
  console.log(req.query);
  const { searchTerm, order } = req.query;
  let constructedSearchTerm;
  if (searchTerm === "" || searchTerm === undefined) {
    constructedSearchTerm = "%%";
  } else {
    constructedSearchTerm = `%${searchTerm}%`;
  }
  db.query(searchUsers, [constructedSearchTerm, order])
    .then((dbRes) => {
      console.log(dbRes);
      res.json(dbRes);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
