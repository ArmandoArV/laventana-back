const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const locationController = {
  getLocations: async (req, res) => {
    try {
      const locations = await connection.query("SELECT * FROM Location");
      res.json(locations);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error, couldn't get locations" });
    }
  },
  getLocation: async (req, res) => {
    try {
      const location = await connection.query(
        "SELECT * FROM Location WHERE idLocation = ?"
      );
      res.json(location);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Internal server error, couldn't get location with id " + idLocation,
      });
    }
  },

  addLocation: async (req, res) => {
    try {
      const {
        name,
        description,
        image,
        tur,
        agr,
        med,
        bio,
        latitude,
        longitude,
      } = req.body;
      const imageBase64 = image.toString("base64");
      const sql =
        "INSERT INTO Location (name, description, image, tur, agr, med, bio, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await connection.query(sql, [
        name,
        description,
        imageBase64,
        tur,
        agr,
        med,
        bio,
        latitude,
        longitude,
      ]);
      res.json({ message: "Location created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error, couldn't add location",
      });
    }
  },

  modifyLocation: async (req, res) => {
    try {
      const idLocation = req.params.idLocation;
      const {
        name,
        description,
        image,
        tur,
        agr,
        med,
        bio,
        latitude,
        longitude,
      } = req.body;
      const imageBase64 = image.toString("base64");
      const sql =
        "UPDATE Location SET name = ?, description = ?, image = ?, tur = ?, agr = ?, med = ?, bio = ?, latitude = ?, longitude = ? WHERE idLocation = ?";
      await connection.query(sql, [
        name,
        description,
        imageBase64,
        tur,
        agr,
        med,
        bio,
        latitude,
        longitude,
        idLocation,
      ]);
      res.json({ message: "Location modified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error, couldn't modify location",
      });
    }
  },

  deleteLocation: async (req, res) => {
    try {
      const idLocation = req.params.idLocation;
      const sql = "DELETE FROM Location WHERE idLocation = ?";
      await connection.query(sql, [idLocation]);
      res.json({ message: "Location deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = locationController;
