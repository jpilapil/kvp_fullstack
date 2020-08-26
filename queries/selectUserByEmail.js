const selectUserByEmail = `
SELECT 
   users.id AS user_id,
   users.handle,
   users.email,
   users.password,

   users.created_at,
   technologies.id AS technology_id,
   technologies.name

FROM
   users
INNER JOIN
   xref_user_technologies ON user_id = users.id
INNER JOIN
   technologies ON technologies.id = xref_user_technologies.technology_id
WHERE 
   email = ?;`;

module.exports = selectUserByEmail;
