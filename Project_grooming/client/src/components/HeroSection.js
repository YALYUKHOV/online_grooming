import React from 'react';
import { NavLink } from 'react-router-dom';
import { SERVICE_ROUTE } from '../utils/consts';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Профессиональный груминг для ваших питомцев</h1>
                <p>Создаем красоту и комфорт для ваших любимцев с любовью и заботой</p>
                <NavLink to={SERVICE_ROUTE} className="hero-button">
                    Записаться на прием
                </NavLink>
            </div>
        </section>
    );
};

export default HeroSection; 