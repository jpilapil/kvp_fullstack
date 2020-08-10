const selectUserById = `
     SELECT 
     id, handle, email, gender, created_at
     FROM
        users
     WHERE
        id = ?
     LIMIT 1;
     `;
module.exports = selectUserById;
