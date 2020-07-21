// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const searchUsers = require("../../queries/searchUsers");
const allUsers = require("../../queries/allUsers");
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
  db.query(searchUsers)
    .then((allUsers) => {
      const camelCasedUsers = allUsers.map((user) => {
        return {
          userId: user.user_id,
          handle: user.handle,
          gender: user.gender,
          preferredGender: user.preferred_gender,
          createdAt: user.created_at,
          rating: user.rating,
          technologyId: user.technology_id,
          technologyName: user.name,
          popularity: user.popularity,
        };
      });
      console.log(camelCasedUsers);
      res.json(camelCasedUsers);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
