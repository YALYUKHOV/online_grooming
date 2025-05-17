import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SERVICE_ROUTE } from '../utils/consts';
import AppointmentModal from './AppointmentModal';
import './HeroSection.css';

const HeroSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Профессиональный груминг для ваших питомцев</h1>
                <p>Создаем красоту и комфорт для ваших любимцев с любовью и заботой</p>
                <button 
                    className="hero-button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Записаться на прием
                </button>
            </div>

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default HeroSection; 