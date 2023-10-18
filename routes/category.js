const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController"); // Update the path accordingly
const middleware = require("../middleware/jwt-middleware");

router.get("/category", middleware, categoryController.getCategories);

router.get("/category/:idCategory", middleware, categoryController.getCategory);

router.post("/category", middleware, categoryController.createCategory);

router.post(
  "/category/addCategoryToLocation",
  middleware,
  categoryController.addCategoryToLocation
);

router.delete(
  "/category/:idCategory",
  middleware,
  categoryController.deleteCategory
);

module.exports = router;
