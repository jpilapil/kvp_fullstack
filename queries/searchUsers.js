// search for users based on input
module.exports = function searchUsers(search_term, order) {
  return `
   SELECT 
      *
   FROM
      users
   WHERE
      handle LIKE '%${search_term}%'
   ORDER BY
      ${order};
   `;
};
