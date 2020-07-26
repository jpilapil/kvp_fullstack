// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const allUserTech = require("../../queries/allUserTech");

// const { toJson, toSafeParse } = require("../../utils/helpers");

// @route      GET api/v1/all-user-tech
// @desc       GET all users by search term and order
// @access     PUBLIC

router.get("/", (req, res) => {
  db.query(allUserTech)
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
      // console.log("camel cased users: ", camelCasedUsers);
      res.json(camelCasedUsers);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
