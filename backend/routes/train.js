const express = require('express');
const { Train, Station, Seat } = require('../models');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/access');
const {Op}=require("sequelize")
const trainRouter = express.Router();

// Add a new train (admin only)
// authenticateToken,checkRole(["admin"]),
trainRouter.post('/train', async (req, res) => {
    const { train_name, source_station_id, destination_station_id, total_seats } = req.body;
  
    try {
      // Check if source and destination stations exist
      const sourceStation = await Station.findByPk(source_station_id);
      const destinationStation = await Station.findByPk(destination_station_id);
  
      if (!sourceStation || !destinationStation) {
        return res.status(404).json({ error: 'Source or destination station not found' });
      }
  
      // Create new train
      const newTrain = await Train.create({
        train_name,
        source_station_id,
        destination_station_id,
        total_seats
      });
  
      // Create seats for the new train
      const seats = [];
      for (let i = 1; i <= total_seats; i++) {
        seats.push({ train_id: newTrain.train_id, seat_number: i, is_available: true });
      }
  
      await Seat.bulkCreate(seats);
  
      res.status(201).json({ message: 'Train added successfully', train: newTrain });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get available trains and seat availability
trainRouter.get('/train', async (req, res) => {
    const { source_station_name, destination_station_name } = req.query;
  
    try {
      // Fetch the station IDs based on the provided station names
      const sourceStation = await Station.findOne({ where: { station_name: source_station_name } });
      const destinationStation = await Station.findOne({ where: { station_name: destination_station_name } });
  
      if (!sourceStation || !destinationStation) {
        return res.status(404).json({ error: 'One or both stations not found' });
      }
  
      const trains = await Train.findAll({
        where: {
          source_station_id: sourceStation.station_id,
          destination_station_id: destinationStation.station_id,
          total_seats: {
            [Op.gt]: 0 // Check if total_seats is greater than 0
          }
        },
        include: [
          { model: Station, as: 'sourceStation', attributes: ['station_name'] },
          { model: Station, as: 'destinationStation', attributes: ['station_name'] },
        ]
      });
  
      res.json({ trains });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = trainRouter;
