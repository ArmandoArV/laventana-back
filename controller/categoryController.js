const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await connection.query("SELECT * FROM Category");
      res.json(categories);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error, couldn't get categories" });
    }
  },

  getCategory: async (req, res) => {
    try {
      const idCategory = req.params.idCategory;
      const sql = "SELECT * FROM Category WHERE idCategory = ?";
      const result = await connection.query(sql, [idCategory]);
      const category = result[0][0];
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Internal server error, couldn't get category with id " + idCategory,
      });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const sql = "INSERT INTO Category (name) VALUES (?)";
      const result = await connection.query(sql, [name]);
      res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error, couldn't create category" });
    }
  },

  addCategoryToLocation: async (req, res) => {
    try {
      const { idLocation, idCategory } = req.body;
      const sql =
        "INSERT INTO location_has_category (idLocation, idCategory) VALUES (?, ?)";
      const result = await connection.query(sql, [idLocation, idCategory]);
      res
        .status(201)
        .json({ message: "Category added to location successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error, couldn't add category to location",
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { idCategory } = req.body;
      const sql = "DELETE FROM Category WHERE idCategory = ?";
      const result = await connection.query(sql, [idCategory]);
      if (result.affectedRows === 1) {
        res.json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error, couldn't delete category" });
    }
  },
};

module.exports = categoryController;
