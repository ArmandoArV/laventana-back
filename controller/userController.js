const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const userController = {
  validateUser: async (req, res) => {
    try {
      const username = req.body.username;
      const sql = "SELECT * FROM User WHERE username = ?";
      console.log("SQL Query:", sql);

      const result = await connection.query(sql, [username]);
      console.log("Query Result:", result);

      const userExists = result[0].length > 0;

      if (userExists) {
        console.log(`User with username ${username} exists.`);
        res.json({ message: "User exists" });
      } else {
        console.log(`User with username ${username} does not exist.`);
        res.json({ message: "User does not exist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const sql = "INSERT INTO User (username, password) VALUES (?, SHA2(?, 256))";
      const caseSensitive = false;
      await connection.query(sql, [username, password]);
      res.json({ message: "User created successfully", caseSensitive });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await connection.query("SELECT * FROM User");
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const idUser = req.params.idUser;
      const sql = "DELETE FROM User WHERE idUser = ?";
      await connection.query(sql, [idUser]);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;