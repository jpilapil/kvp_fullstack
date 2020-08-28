// users resource
require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../../db");
const allUsers = require("../../queries/allUsers");
const { toHash, toSafeParse, toJson } = require("../../utils/helpers");
const insertUser = require("../../queries/insertUser");
const insertXrefUserTech = require("../../queries/insertXrefUserTech");
const selectUserById = require("../../queries/selectUserById");
const selectUserByHandle = require("../../queries/selectUserByHandle");
const selectUserByEmail = require("../../queries/selectUserByEmail");
const { v4: getUuid } = require("uuid");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getSignUpHandleError = require("../../validation/getSignUpHandleError");
const getLogInEmailError = require("../../validation/getLogInEmailError");
const getLogInPasswordError = require("../../validation/getLogInPasswordError");
const jwt = require("jsonwebtoken");

// @route      GET api/v1/users
// @desc       GET a valid user via email and password
// @access     PUBLIC
router.get("/", (req, res) => {
  // console.log(req.query);
  db.query(allUsers)
    .then((dbRes) => {
      const users = toSafeParse(toJson(dbRes)); // get response and turn it into json, then parse json to convert to array
      // console.log(users);
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
      ``;
    });
});

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
    // gender,
    createdAt,
    techInterestedIn,
  } = req.body;
  const emailError = await getSignUpEmailError(email);
  const passwordError = getSignUpPasswordError(password, email);
  const handleError = await getSignUpHandleError(handle);
  let dbError = "";
  if (emailError === "" && passwordError === "" && handleError === "") {
    const user = {
      id: id,
      handle: handle,
      email: email,
      password: await toHash(password),
      // gender: gender,
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

    // user queries
    db.query(insertUser, user)
      .then(() => {
        db.query(selectUserById, id)
          .then((users) => {
            const user = users[0];
            res.status(200).json({
              id: user.id,
              handle: user.handle,
              email: user.email,
              // gender: user.gender,
              createdAt: user.created_at,
            });
            db.query(selectUserByHandle, handle)
              .then((users) => {
                const user = users[0];
                res.status(200).json({
                  // id: user.id,
                  handle: user.handle,
                  // email: user.email,
                  // gender: user.gender,
                  // createdAt: user.created_at,
                });
              })
              .catch((err) => {
                console.log(err);
                dbError = `${err.code} ${err.sqlMessage}`;
                res.status(400).json({ dbError });
              });
          })
          .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
          });
      })
      .catch((err) => {
        // console.log(err);
        // res.status(400).json({ emailError, passwordError, handleError });
        console.log(err);
        dbError = `${err.code} ${err.sqlMessage}`;
        res.status(400).json({ dbError });
      });

    // tech queries
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
  } else {
    res.status(400).json({ emailError, passwordError, handleError });
  }
});

// @route      POST api/v1/users/auth
// @desc       Check this user against db via email and password
// @access     PUBLIC
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const emailError = getLogInEmailError(email);
  const passwordError = await getLogInPasswordError(password, email);
  let dbError = "";
  if (emailError === "" && passwordError === "") {
    // return the user to the client
    db.query(selectUserByEmail, email)
      .then((users) => {
        // returns 3 user objects from the db with inner join
        // const user = users;
        // res.status(200).json({
        //   // send json with values from database
        //   id: user.map((id) => id.user_id),
        //   email: user.map((email) => email.email),
        //   createdAt: user.map((created) => created.created_at),
        //   technologyName: user.map((tech) => tech.name),
        //   technologyId: user.map((techId) => techId.technology_id),
        // });

        const user = {
          id: users.map((id) => id.user_id),
          email: users.map((email) => email.email),
          handle: users.map((handle) => handle.handle),
          createdAt: users.map((created) => created.created_at),
          technologyName: users.map((tech) => tech.name),
          technologyId: users.map((techId) => techId.technology_id),
        };
        const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "1d",
        });
        console.log(user);
        res.status(200).json(accessToken);
      })
      .catch((err) => {
        console.log(err);
        dbError = `${err.code} ${err.sqlMessage}`;
        res.status(400).json({ dbError });
      });
  } else {
    // return 400 status to client
    res.status(400).json({ emailError, passwordError });
  }
});

module.exports = router;
