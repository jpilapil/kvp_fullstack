const selectUserByHandle = `
   SELECT 
      *
   FROM
      users
   WHERE
      handle = ?
   LIMIT 1;
         
   `;

module.exports = selectUserByHandle;
