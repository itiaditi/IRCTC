const express = require('express');
const { Station } = require('../models');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/access');

const stationRouter = express.Router();

// Add a new station (admin only)
stationRouter.post('/addstation',authenticateToken,checkRole(["admin"]), async (req, res) => {
  const { station_name } = req.body;

  try {
    // Check if the station already exists
    let existingStation = await Station.findOne({ where: { station_name } });
    if (existingStation) {
      return res.status(400).json({ error: 'Station already exists' });
    }

    // Create new station
    const newStation = await Station.create({
      station_name
    });

    res.status(201).json({ message: 'Station added successfully', station: newStation });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = stationRouter;
