const express = require("express");
const app = express();
const path = require("path");

app.use("/api/v1/users", require("./api/v1/users")); // use users.js route
app.use("/api/v1/all-user-tech", require("./api/v1/all-user-tech")); // use allUsers.js route
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'); // ./client/build/index.html
});

const port = process.env.PORT || 1337;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
