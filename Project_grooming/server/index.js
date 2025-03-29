require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const routers = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(express.json()); // Middleware для парсинга JSON
app.use(express.static(path.resolve(__dirname, 'static'))); // Middleware для обработки статических файлов
app.use(fileUpload({})); // Middleware для обработки файлов
app.use('/api', routers); // Подключение роутов

// Обработка ошибок, должен быть в конце, по скольку на нем работы прекращается и на клиент ответ
app.use(errorHandler); 

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





