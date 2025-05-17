import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Создаем экземпляр axios с базовым URL
const $api = axios.create({
    baseURL: API_URL
});

// Добавляем перехватчик запросов для автоматического добавления токена
$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Добавляем перехватчик ответов для обработки ошибок
$api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export const userAPI = {
    // Регистрация пользователя
    async registration(email, password, name, phone) {
        const response = await $api.post('/client/registration', {
            email,
            password,
            name,
            phone
        });
        return response.data;
    },

    // Авторизация пользователя
    async login(email, password) {
        const response = await $api.post('/client/login', {
            email,
            password
        });
        return response.data;
    },

    // Проверка авторизации
    async check() {
        try {
            const response = await $api.get('/client/check');
            return response.data;
        } catch (e) {
            if (e.response?.status === 401) {
                localStorage.removeItem('token');
            }
            throw e;
        }
    },

    // Получение информации о пользователе
    async getUserInfo() {
        try {
            const response = await $api.get('/client/appointments');
            if (!Array.isArray(response.data)) {
                console.error('Неверный формат данных:', response.data);
                return [];
            }
            return response.data;
        } catch (e) {
            console.error('Ошибка при получении записей:', e);
            throw e;
        }
    },

    // Получение доступных дат
    async getAvailableDates() {
        const response = await $api.get('/client/available-dates');
        return response.data;
    },

    // Получение списка услуг
    async getServices() {
        const response = await $api.get('/services');
        return response.data;
    },

    // Создание новой записи
    async createAppointment(appointmentData) {
        const response = await $api.post('/client/appointments', appointmentData);
        return response.data;
    },

    // Обновление информации о пользователе
    async updateUserInfo(userData) {
        const response = await $api.put('/client/update', userData);
        return response.data;
    },

    // Выход из системы
    async logout() {
        try {
            await $api.post('/client/logout');
        } finally {
            localStorage.removeItem('token');
        }
    }
}; 