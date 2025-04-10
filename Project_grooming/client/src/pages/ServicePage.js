import React from 'react';
import { useParams } from 'react-router-dom';

const ServicePage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Страница услуги {id}</h1>
        </div>
    );
};

export default ServicePage;
