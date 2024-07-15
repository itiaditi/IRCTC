const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Train = require('./train');

const Seat = sequelize.define('Seat', {
  seat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  train_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Train,
      key: 'train_id'
    }
  },
  seat_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Seat;
