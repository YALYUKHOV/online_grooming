import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import './MainPage.css';
import about from '../image/bigudi.jpg';
import result1 from '../image/result1.jpg';
import result2 from '../image/result2.jpg';

const MainPage = () => {
    const testimonials = [
        {
            name: 'Анна',
            text: 'Отличный сервис! Мой пудель всегда выглядит потрясающе после посещения салона.',
            rating: 5
        },
        {
            name: 'Михаил',
            text: 'Профессиональные мастера, внимательное отношение к питомцам. Рекомендую!',
            rating: 5
        },
        {
            name: 'Елена',
            text: 'Очень довольна результатом. Спасибо за заботу о моей кошке!',
            rating: 5
        }
    ];

    return (
        <div className="main-page">
            <HeroSection />
            <Features />
            
            {/* About Section */}
            <section className="about-section">
                <div className="about-container">
                    <div className="about-content">
                        <h2>О нашем салоне</h2>
                        <p>Мы - команда профессиональных грумеров, которые любят свою работу и заботятся о каждом питомце. Наш салон оснащен современным оборудованием, а мастера регулярно повышают свою квалификацию.</p>
                        <p>Мы работаем с 2015 года и за это время помогли тысячам питомцев выглядеть красиво и чувствовать себя комфортно.</p>
                        <Link to="/services" className="about-button">Наши услуги</Link>
                    </div>
                    <div className="about-image">
                        <img src={about} alt="about" />
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section">
                <h2>Наши работы</h2>
                <div className="gallery-grid">
                    {/* Здесь будут миниатюры работ */}
                    <div className="gallery-item">
                        <img src={result1} alt="result1" />
                    </div>
                    <div className="gallery-item">
                        <img src={result2} alt="result2" />
                    </div>
                    
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <h2>Отзывы наших клиентов</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-rating">
                                {'★'.repeat(testimonial.rating)}
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <p className="testimonial-author">- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="contact-container">
                    <div className="contact-info">
                        <h2>Свяжитесь с нами</h2>
                        <p>Мы всегда рады ответить на ваши вопросы</p>
                        <div className="contact-details">
                            <p>📞 +7 (XXX) XXX-XX-XX</p>
                            <p>📧 info@grooming-salon.ru</p>
                            <p>📍 г. Москва, ул. Примерная, д. 123</p>
                        </div>
                    </div>
                    <div className="contact-form">
                        <form>
                            <input type="text" placeholder="Ваше имя" />
                            <input type="email" placeholder="Ваш email" />
                            <textarea placeholder="Ваше сообщение"></textarea>
                            <button type="submit">Отправить</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainPage;
