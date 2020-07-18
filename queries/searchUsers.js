// search for users based on input
const searchUsers = `
   SELECT 
      *
   FROM
      users
   WHERE
      handle LIKE ?
   ORDER BY
      ?;
   `;

module.exports = searchUsers;
