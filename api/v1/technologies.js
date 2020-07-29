const express = require("express");
const router = express.Router();
const db = require("../../db");
const allTechnologies = require("../../queries/allTechnologies");

// @route      GET api/v1/technologies
// @desc       Gets all technologies
// @access     Public
router.get("/", (req, res) => {
  db.query(allTechnologies)
    .then((technologies) => {
      res.json(technologies);
    })
    .catch((err) => console.log(err));
});
module.exports = router;
