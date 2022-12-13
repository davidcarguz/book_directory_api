require('dotenv').config();
const { Sequelize } = require('sequelize');
const setupModels = require('./db/models/index')

const host = process.env.DB_HOST;
const port= 5432;
const user= encodeURIComponent(process.env.DB_USER);
const password= encodeURIComponent(process.env.DB_PASSWORD);
const database= 'book_directory';

const URI = `postgres://${user}:${password}@${host}:${port}/${database}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true
});

setupModels(sequelize);

sequelize.sync()

module.exports = sequelize;