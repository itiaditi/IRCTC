const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Station = require('./station');

const Train = sequelize.define('Train', {
  train_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  train_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  source_station_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Station,
      key: 'station_id'
    }
  },
  destination_station_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Station,
      key: 'station_id'
    }
  },
  total_seats: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Train;
