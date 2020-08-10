const { HANDLE_REGEX } = require("../utils/helpers");
const db = require("../db");
const selectUserByHandle = require("../queries/selectUserByHandle");

module.exports = async function getSignUpHandleError(handle) {
  if (handle === "") {
    return "Please enter a username.";
  }
  if (HANDLE_REGEX.test(handle) === false) {
    return 'Please enter a valid username between 3-16 characters. Cannot contain special characters, i.e, "!@#?$".';
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
