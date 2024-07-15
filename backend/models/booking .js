const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Train = require('./train');
const Seat = require('./seat');

const Booking = sequelize.define('Booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  train_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Train,
      key: 'train_id'
    }
  },
  seat_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Seat,
      key: 'seat_id'
    }
  },
  booking_status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  booking_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Booking;
