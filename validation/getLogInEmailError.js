const { EMAIL_REGEX } = require("../utils/helpers");

module.exports = function getLogInEmailError(email) {
  if (email === "") {
    return "Please enter your email address.";
  }
  if (EMAIL_REGEX.test(email) === false) {
    return "Please enter a valid email address.";
  }

  return "";
};
