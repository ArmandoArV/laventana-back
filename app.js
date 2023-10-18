const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const login = require("./routes/login");
const user = require("./routes/user");
const category = require("./routes/category");
const location = require("./routes/location");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", login);
app.use("/", user);
app.use("/", category);
app.use("/", location);

const port = process.env.port || 3001;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
