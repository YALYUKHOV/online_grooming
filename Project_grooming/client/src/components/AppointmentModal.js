import React, { useState, useEffect } from 'react';
import { userAPI } from '../http/userAPI';
import './AppointmentModal.css';

const AppointmentModal = ({ isOpen, onClose, onSuccess }) => {
    const [services, setServices] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        try {
            const [servicesResponse, datesResponse] = await Promise.all([
                userAPI.getServices(),
                userAPI.getAvailableDates()
            ]);
            setServices(servicesResponse || []);
            setAvailableDates(datesResponse.dates || []);
        } catch (e) {
            console.error('Ошибка при получении данных:', e);
            setError('Не удалось загрузить данные');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointmentData = {
                schedule_id: selectedDate,
                service_ids: [selectedService]
            };
            await userAPI.createAppointment(appointmentData);
            onSuccess();
            onClose();
        } catch (e) {
            console.error('Ошибка при создании записи:', e);
            setError('Не удалось создать запись');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Запись на прием</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="service">Выберите услугу:</label>
                        <select
                            id="service"
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            required
                        >
                            <option value="">Выберите услугу</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - {service.price} ₽
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Выберите дату и время:</label>
                        <select
                            id="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                        >
                            <option value="">Выберите дату и время</option>
                            {availableDates.map(date => (
                                <option key={date.id} value={date.id}>
                                    {new Date(date.date_time).toLocaleString()} - Мастер: {date.employee.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="submit-button">
                        Записаться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentModal; 