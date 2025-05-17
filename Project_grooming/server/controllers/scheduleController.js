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
  
    async getAll(req, res, next) {
      try {
        const schedules = await Schedule.findAll({
          include: [{
            model: Employee,
            attributes: ['id', 'name']
          }],
          order: [['date_time', 'ASC']]
        });
        return res.json(schedules);
      } catch (e) {
        next(ApiError.badRequest(e.message));
      }
    }
  
    async delete(req, res, next) {
      try {
        const { id } = req.params;
        const schedule = await Schedule.findByPk(id);
        if (!schedule) {
          return next(ApiError.badRequest('Запись в расписании не найдена'));
        }
        await schedule.destroy();
        return res.json({ message: 'Запись в расписании удалена' });
      } catch (e) {
        next(ApiError.badRequest(e.message));
      }
    }
  
    async update(req, res, next) {
      try {
        const { id } = req.params;
        const { date_time, employee_id, is_available } = req.body;
        const schedule = await Schedule.findByPk(id);
        if (!schedule) {
          return next(ApiError.badRequest('Запись в расписании не найдена'));
        }
        await schedule.update({
          date_time,
          employee_id,
          is_available
        });
        return res.json(schedule);
      } catch (e) {
        next(ApiError.badRequest(e.message));
      }
    }
  }
  
  module.exports = new ScheduleController();