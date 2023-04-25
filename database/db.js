const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectToDatabase()

module.exports = {
    sequelize,
    connectToDatabase
};
