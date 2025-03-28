require('dotenv').config();
const {Sequelize} = require('sequelize');



const sequelize = new Sequelize(
    process.env.DB_NAME, // Имя БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // Пароль
    {
        dialect: 'postgres',
        host: process.env.DB_HOST, // Хост
        port: process.env.DB_PORT // Порт
    }
);

module.exports = sequelize;
