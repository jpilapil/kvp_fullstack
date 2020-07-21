// search for users based on input
// const searchUsers =
// `
//    SELECT
//       *
//    FROM
//       users
//    WHERE
//       handle LIKE ?
//    ORDER BY
//       ?;
//     `
//    ;

const searchUsers = `
SELECT
    users.id AS user_id,
    users.handle,
    users.email,
    users.password,
    users.gender,
    users.preferred_gender,
    users.created_at,
    users.rating,
    technologies.id AS technology_id,
    technologies.name,
    technologies.popularity
FROM
    users
		INNER JOIN
	xref_user_technologies ON user_id = users.id
		INNER JOIN
   technologies ON technologies.id = xref_user_technologies.technology_id;
   `;

module.exports = searchUsers;
