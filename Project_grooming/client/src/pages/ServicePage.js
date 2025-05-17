import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../context';
import './ServicePage.css';

const ServicePage = () => {
    const { id } = useParams();
    const { service } = useContext(Context);

    if (id) {
        const serviceItem = service.getServiceById(Number(id));
        if (!serviceItem) {
            return <div>Услуга не найдена</div>;
        }
        return (
            <div className="service-detail">
                <h1>{serviceItem.name}</h1>
                <img src={serviceItem.img} alt={serviceItem.name} />
                <p>{serviceItem.description}</p>
                <p className="price">Цена: {serviceItem.price} ₽</p>
            </div>
        );
    }

    return (
        <div className="service-page">
            <h1>Наши услуги</h1>
            <div className="services-grid">
                {service.services.map(serviceItem => (
                    <div key={serviceItem.id} className="service-card">
                        <img src={serviceItem.img} alt={serviceItem.name} className="service-image" />
                        <div className="service-info">
                            <h3>{serviceItem.name}</h3>
                            <p>{serviceItem.description}</p>
                            <p className="service-price">{serviceItem.price} ₽</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicePage;
