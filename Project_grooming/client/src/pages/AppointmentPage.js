import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../http/userAPI';
import { Context } from '../context';
import { LOGIN_ROUTE } from '../utils/consts';
import AppointmentModal from '../components/AppointmentModal';
import './AppointmentPage.css';

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user.isAuth) {
                    navigate(LOGIN_ROUTE);
                    return;
                }
                await fetchAppointments();
            } catch (e) {
                console.error('Ошибка при загрузке данных:', e);
                if (e.response?.status === 401) {
                    user.logout();
                    navigate(LOGIN_ROUTE);
                } else {
                    setError('Не удалось загрузить записи');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user.isAuth, navigate]);

    const fetchAppointments = async () => {
        try {
            const response = await userAPI.getUserInfo();
            console.log('Полученные записи:', response); // Для отладки
            if (Array.isArray(response)) {
                setAppointments(response);
            } else {
                console.error('Неверный формат данных:', response);
                setError('Ошибка при загрузке записей');
            }
        } catch (e) {
            console.error('Ошибка при получении записей:', e);
            setError('Не удалось загрузить записи');
        }
    };

    const handleAppointmentSuccess = () => {
        fetchAppointments();
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="appointments-page">
            <div className="appointments-header">
                <h1>Мои записи</h1>
                <button 
                    className="create-appointment-button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Записаться на прием
                </button>
            </div>

            <div className="existing-appointments">
                {appointments.length === 0 ? (
                    <p>У вас пока нет записей</p>
                ) : (
                    <div className="appointments-list">
                        {appointments.map(appointment => (
                            <div key={appointment.id} className="appointment-card">
                                <div className="appointment-info">
                                    <h3>Запись #{appointment.id}</h3>
                                    <p>Дата: {new Date(appointment.date_time).toLocaleString()}</p>
                                    <p>Статус: {appointment.status}</p>
                                    <p>Мастер: {appointment.Employee?.name}</p>
                                    <div className="services-list">
                                        <h4>Услуги:</h4>
                                        {appointment.Services?.map(service => (
                                            <div key={service.id} className="service-item">
                                                <p>{service.name} - {service.price} ₽</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleAppointmentSuccess}
            />
        </div>
    );
};

export default AppointmentPage; 