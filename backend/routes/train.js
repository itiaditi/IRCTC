const express = require('express');
const { Train, Station, Seat } = require('../models');

const trainRouter = express.Router();

// Add a new train (admin only)
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
    const { source_station_id, destination_station_id } = req.query;
  
    try {
      // Find all trains between source and destination stations
      const trains = await Train.findAll({
        where: {
          source_station_id,
          destination_station_id
        },
        include: [
          { model: Station, as: 'sourceStation', attributes: ['station_name'] },
          { model: Station, as: 'destinationStation', attributes: ['station_name'] },
          {
            model: Seat,
            where: {
              is_available: true
            },
            attributes: ['seat_id', 'seat_number']
          }
        ]
      });
  
      res.json({ trains });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = trainRouter;
