const express = require("express");
const app = express();

app.use("/api/v1/users", require("./api/v1/users")); // use users.js route
app.use("/api/v1/allUsers", require("./api/v1/allUsers")); // use allUsers.js route
app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 1337;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
