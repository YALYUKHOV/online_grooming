import { makeAutoObservable } from "mobx";

export default class ServiceStore{
    constructor(){
        this._services = [
            {
                id: 1,
                name: 'Стрижка',
                description: 'Классическая стрижка для собак',
                price: 1000.00,
                img: 'https://example.com/strizhka.jpg'
            },
            {
                id: 2,
                name: 'Мытье',
                description: 'Комплексное мытье с шампунем',
                price: 500.00,
                img: 'https://example.com/mytie.jpg'
            },
            {
                id: 3,
                name: 'Тримминг',
                description: 'Выщипывание шерсти для жесткошерстных пород',
                price: 1500.00,
                img: 'https://example.com/trimming.jpg'
            },
            {
                id: 4,
                name: 'Чистка ушей',
                description: 'Гигиеническая чистка ушей',
                price: 300.00,
                img: 'https://example.com/ears.jpg'
            },
            {
                id: 5,
                name: 'Стрижка когтей',
                description: 'Аккуратная стрижка когтей',
                price: 200.00,
                img: 'https://example.com/nails.jpg'
            }
        ];
        this._user = {
            id: 1,
            name: 'Тестовый пользователь',
            phone: '+79999999999',
            email: 'test@example.com',
            password: 'test123'
        };
        this._isAuth = true;

        makeAutoObservable(this);
    }

    // Экшены для работы с услугами
    setServices(services) {
        this._services = services;
    }

    addService(service) {
        this._services.push(service);
    }

    updateService(updatedService) {
        this._services = this._services.map(service => 
            service.id === updatedService.id ? updatedService : service
        );
    }

    deleteService(id) {
        this._services = this._services.filter(service => service.id !== id);
    }

    // Экшены для работы с пользователем
    setUser(user) {
        this._user = user;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    // Геттеры
    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get services() {
        return this._services;
    }

    getServiceById(id) {
        return this._services.find(service => service.id === id);
    }
}