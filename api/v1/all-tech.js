const express = require("express");
const router = express.Router();
const db = require("../../db");
const allTech = require("../../queries/allTech");

router.get("/", (req, res) => {
  db.query(allTech)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
