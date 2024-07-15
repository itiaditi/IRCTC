const sequelize = require("./database");



async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

syncDatabase();