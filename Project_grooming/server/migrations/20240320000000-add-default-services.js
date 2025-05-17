'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Services', [
      {
        name: 'Стрижка',
        description: 'Профессиональная стрижка вашего питомца',
        price: 2000,
        duration: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Мытье',
        description: 'Комплексное мытье с использованием профессиональных средств',
        price: 1000,
        duration: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Тримминг',
        description: 'Профессиональный тримминг для жесткошерстных пород',
        price: 2500,
        duration: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Стрижка когтей',
        description: 'Аккуратная стрижка когтей с обработкой',
        price: 500,
        duration: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Чистка ушей',
        description: 'Профессиональная чистка ушей с использованием специальных средств',
        price: 800,
        duration: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  }
}; 