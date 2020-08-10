// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
// const allUsers = require("../../queries/allUsers");
const { toHash } = require("../../utils/helpers");
const insertUser = require("../../queries/insertUser");
const insertXrefUserTech = require("../../queries/insertXrefUserTech");
const selectUserById = require("../../queries/selectUserById");
const { v4: getUuid } = require("uuid");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");

// @route      GET api/v1/users
// @desc       GET a valid user via email and password
// @access     PUBLIC

// router.get("/", (req, res) => {
//   // console.log(req.query);
//   db.query(allUsers)
//     .then((dbRes) => {
//       const users = toSafeParse(toJson(dbRes)); // get response and turn it into json, then parse json to convert to array
//       console.log(users);
//       res.json(users);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// @route      POST api/v1/users
// @desc       Create a new user and user xref tech
// @access     PUBLIC
router.post("/", async (req, res) => {
  // use destructure to avoid repeat of req.body
  const {
    id,
    handle,
    email,
    password,
    gender,
    createdAt,
    techInterestedIn,
  } = req.body;
  const emailError = await getSignUpEmailError(email);
  const passwordError = getSignUpPasswordError(password, email);

  if (emailError === "" && passwordError === "") {
    const user = {
      id: id,
      handle: handle,
      email: email,
      password: await toHash(password),
      gender: gender,
      created_at: createdAt,
    };

    const userXrefTech1 = {
      id: getUuid(),
      user_id: id,
      technology_id: techInterestedIn[0].id,
    };

    const userXrefTech2 = {
      id: getUuid(),
      user_id: id,
      technology_id: techInterestedIn[1].id,
    };

    const userXrefTech3 = {
      id: getUuid(),
      user_id: id,
      technology_id: techInterestedIn[2].id,
    };

    console.log(user);

    db.query(insertUser, user)
      .then(() => {
        db.query(selectUserById, id)
          .then((users) => {
            const user = users[0];
            res.status(200).json({
              id: user.id,
              handle: user.handle,
              email: user.email,
              gender: user.gender,
              createdAt: user.created_at,
            });
          })
          .catch(() => {
            console.log(err);
            res.status(400).json("something happened in the database.");
          });
        db.query(insertXrefUserTech, userXrefTech1)
          .then((res) => {
            db.query(insertXrefUserTech, userXrefTech2)
              .then((res) => {
                db.query(insertXrefUserTech, userXrefTech3)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ emailError, passwordError });
      });
  } else {
    res.status(400).json({ emailError, passwordError });
  }
});

module.exports = router;
