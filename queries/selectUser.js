module.exports = function selectUser(email, password) {
  return `
    SELECT 
       *
    FROM
       users
    WHERE
       email = '${email}'
       AND password = '${password}'
    LIMIT 1;
    `;
};
