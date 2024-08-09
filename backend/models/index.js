const sequelize = require('../config/database');
const User = require('./user');
const Station = require('./station');
const Train = require('./train');
const Seat = require('./seat');
const Booking = require('./booking ');

// Define associations here
Train.belongsTo(Station, { as: 'sourceStation', foreignKey: 'source_station_id' });
Train.belongsTo(Station, { as: 'destinationStation', foreignKey: 'destination_station_id' });
Seat.belongsTo(Train, { foreignKey: 'train_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Train, { foreignKey: 'train_id' });
// Booking.belongsTo(Seat, { foreignKey: 'seat_id' });

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

// syncDatabase();
module.exports = {
  User,
  Station,
  Train,
  Seat,
  Booking
};
