import React from 'react';
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: '👨‍⚕️',
            title: 'Опытные мастера',
            description: 'Наши грумеры имеют более 5 лет опыта работы с различными породами собак и кошек'
        },
        {
            icon: '🛡️',
            title: 'Безопасные процедуры',
            description: 'Используем только гипоаллергенные средства и безопасные методики ухода'
        },
        {
            icon: '🎯',
            title: 'Индивидуальный подход',
            description: 'Учитываем особенности породы, характер и состояние здоровья каждого питомца'
        },
        {
            icon: '⚙️',
            title: 'Современное оборудование',
            description: 'Работаем на профессиональном оборудовании ведущих мировых брендов'
        }
    ];

    return (
        <section className="features">
            <div className="features-container">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features; 