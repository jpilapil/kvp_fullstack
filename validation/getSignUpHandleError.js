const { HANDLE_REGEX } = require("../utils/helpers");
const db = require("../db");
const selectUserByHandle = require("../queries/selectUserByHandle");

module.exports = async function getSignUpHandleError(handle) {
  if (handle === "") {
    return "Please enter a username.";
  }
  if (HANDLE_REGEX.test(handle) === false) {
    return "Username may only contain A-Z, 0-9, underscores, and dashes.";
  }
  if (await checkIsInDb(handle)) {
    return "This username already exists!";
  }

  return "";
};

function checkIsInDb(handle) {
  return db
    .query(selectUserByHandle, handle)
    .then((users) => {
      console.log(users);
      if (users.length === 0) return false;
      else return true;
    })
    .catch((err) => {
      console.log(err);
    });
}
