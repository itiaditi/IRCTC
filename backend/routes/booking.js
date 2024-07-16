const express = require('express');
const { Train, Seat, Booking, User } = require('../models');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/access');

const bookingRouter = express.Router();

// Book a seat (for all users)
// ,authenticateToken,checkRole(["user"])
bookingRouter.post('/book', async (req, res) => {
  const { train_name, number_of_seats } = req.body;

  try {
    // Find the train by train_name
    const train = await Train.findOne({
      where: {
        train_name
      }
    });

    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }

    if (train.total_seats < number_of_seats) {
      return res.status(400).json({ error: 'Not enough seats available on this train' });
    }

    // Create new bookings for the requested number of seats
    const bookings = [];
    for (let i = 0; i < number_of_seats; i++) {
      const booking = await Booking.create({
        train_id: train.train_id,
        seat_id: null, // If you don't have specific seat IDs to assign
        booking_status: 'confirmed'
      });
      bookings.push(booking);
    }

    // Update total_seats in Train table
    await Train.update({ total_seats: train.total_seats - number_of_seats }, {
      where: {
        train_id: train.train_id
      }
    });

    res.status(201).json({ message: 'Seats booked successfully', bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get booking details by booking ID
// ,authenticateToken,checkRole(["user"]),
bookingRouter.get('/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
  
    try {
      // Fetch booking details including related train and seat information
      const booking = await Booking.findOne({
        where: { booking_id: bookingId },
        include: [
          {
            model: Train,
            attributes: ['train_id', 'train_name'],
          },
          {
            model: Seat,
            attributes: ['seat_id', 'seat_number'],
          },
          {
            model: User, // Include User model if user ID is associated with bookings
            attributes: ['id', 'name', 'email'],
          },
        ],
      });
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(200).json({ booking });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = bookingRouter;
