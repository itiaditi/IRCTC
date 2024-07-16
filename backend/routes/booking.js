const express = require('express');
const { Train, Seat, Booking, User } = require('../models');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/access');

const bookingRouter = express.Router();

// Book a seat (for all users)
// ,authenticateToken,checkRole(["user"])
bookingRouter.post('/book', async (req, res) => {
  const { train_id, seat_id } = req.body;

  try {
    // Check if the seat is available
    const seat = await Seat.findOne({
      where: {
        seat_id,
        train_id,
        is_available: true
      }
    });

    if (!seat) {
      return res.status(404).json({ error: 'Seat not available for booking' });
    }

    // Create a new booking
    const booking = await Booking.create({
      train_id,
      seat_id,
      booking_status: 'confirmed'
    });

    // Update seat availability
    await Seat.update({ is_available: false }, {
      where: {
        seat_id,
        train_id,
        is_available: true
      }
    });

    res.status(201).json({ message: 'Seat booked successfully', booking });
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
