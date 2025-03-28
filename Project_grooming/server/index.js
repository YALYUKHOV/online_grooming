require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate()
            .then(() => console.log('Подключение к базе данных успешно!'))
            .catch(err => console.error('Ошибка подключения:', err));
        await sequelize.sync(); // Синхронизация моделей с базой данных
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();





