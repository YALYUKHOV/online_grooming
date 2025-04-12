const {Schedule, Employee} = require('../models/models');
const ApiError = require('../error/ApiError');

class ScheduleController{
    async create(req, res, next) {
      try {
        const { date_time, employee_id } = req.body;

        // Проверяем существование мастера
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
          return next(ApiError.badRequest('Мастер не найден'));
        }

        const schedule = await Schedule.create({ date_time, employee_id });
        return res.json(schedule);
      } catch (e) {
        console.error('Ошибка при создании записи в расписании:', e);
        return next(ApiError.internal(e.message));
      }
    }
  
    async getAll(req, res) {
      const schedules = await Schedule.findAll();
      return res.json(schedules);
    }
  
    async deleteOne(req, res) {
      const { id } = req.params;
      const schedule = await Schedule.destroy({ where: { id } });
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
      return res.json({ message: 'Schedule deleted successfully' });
    }
  
    async updateOne(req, res) {
      const { id } = req.params;
      const { date_time, employee_id } = req.body;
      const schedule = await Schedule.update({ date_time, employee_id }, { where: { id } });
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
      return res.json({ message: 'Schedule updated successfully' });
    }
  }
  
  module.exports = new ScheduleController();