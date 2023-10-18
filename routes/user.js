const express = require("express");
const router = express.Router();
const userController = require("../controller/userController"); // Update the path accordingly
const middleware = require("../middleware/jwt-middleware");

router.post("/user/validate", userController.validateUser);
router.post("/user/register", userController.registerUser);
router.get("/user", middleware, userController.getAllUsers);
router.delete(
  "/user/delete/:idUser",
  middleware,
  userController.deleteUser
);

module.exports = router;