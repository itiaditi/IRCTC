const express = require('express');
const { Train, Seat, Booking, User } = require('../models');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/access');

const bookingRouter = express.Router();

// Book a seat (for all users)
// ,authenticateToken,checkRole(["user"])
bookingRouter.post('/book', authenticateToken, checkRole(["user"]), async (req, res) => {
  const { train_name, number_of_seats } = req.body;
  const userId = req.user.id; // Assuming user ID is available in req.user after authentication

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
        user_id: userId, // Save user ID with the booking
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

bookingRouter.get('/bookings', authenticateToken, checkRole(['user']), async (req, res) => {
  const userId = req.user.id; // Retrieve user ID from the authenticated request

  try {
    // Fetch all bookings for the logged-in user including related train information
    const bookings = await Booking.findAll({
      where: {
        user_id: userId
      },
      include: [
        {
          model: Train,
          attributes: ['train_id', 'train_name'],
        },
        {
          model: User, // Include User model to fetch user details (optional if you want to verify)
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!bookings.length) {
      return res.status(404).json({ error: 'No bookings found' });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = bookingRouter;
