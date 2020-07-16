require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: "key_value_pairs_app",
});

connection.connect();

connection.query(
  `
   SELECT 
      *
   FROM
      xref_user_technologies
   WHERE
      technology_id = 1;
   `,
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  }
);

connection.end();
