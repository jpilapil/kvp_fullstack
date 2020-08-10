const bcrypt = require("bcrypt");

module.exports = {
  toJson(data) {
    return JSON.stringify(data);
  },

  toSafeParse(str) {
    try {
      JSON.parse(str);
    } catch (err) {
      console.log(err);
      return str;
    }
    return JSON.parse(str);
  },

  toHash(password) {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  },

  EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  HANDLE_REGEX: /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
};
