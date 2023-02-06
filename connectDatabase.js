const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: 3306,
    dialect: 'mysql'
});

module.exports = sequelize;