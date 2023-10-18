const express = require("express");
const router = express.Router();
const locationController = require("../controller/locationController"); // Update the path accordingly
const middleware = require("../middleware/jwt-middleware");

router.get("/location", locationController.getLocations);
router.get("/location/:idLocation", locationController.getLocation);
router.post("/location/add", middleware, locationController.addLocation);
router.put(
  "/location/modify/:idLocation",
  middleware,
  locationController.modifyLocation
);
router.delete(
  "/location/delete/:idLocation",
  middleware,
  locationController.deleteLocation
);

module.exports = router;
