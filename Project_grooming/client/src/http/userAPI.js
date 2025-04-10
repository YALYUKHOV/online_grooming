import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const userAPI = {
    // Регистрация пользователя
    async registration(email, password) {
        const response = await axios.post(`${API_URL}/user/registration`, {
            email,
            password
        });
        return response.data;
    },

    // Авторизация пользователя
    async login(email, password) {
        const response = await axios.post(`${API_URL}/user/login`, {
            email,
            password
        });
        return response.data;
    },

    // Проверка авторизации
    async check() {
        const response = await axios.get(`${API_URL}/user/auth`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    // Получение информации о пользователе
    async getUserInfo() {
        const response = await axios.get(`${API_URL}/user/info`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    // Обновление информации о пользователе
    async updateUserInfo(userData) {
        const response = await axios.put(`${API_URL}/user/update`, userData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    }
}; 