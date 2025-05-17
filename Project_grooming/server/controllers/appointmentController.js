const { Appointment, Service, Schedule, Employee, AppointmentService } = require('../models/models');
const ApiError = require('../error/ApiError');

class AppointmentController{
  async create(req, res, next) {
    try {
      const { schedule_id, service_ids } = req.body;
      const client_id = req.user.id;

      // Проверяем существование расписания
      const schedule = await Schedule.findOne({
        where: {
          id: schedule_id,
          is_available: true
        }
      });

      if (!schedule) {
        return next(ApiError.badRequest('Выбранное время недоступно'));
      }

      // Проверяем, не занято ли время
      const existingAppointment = await Appointment.findOne({
        where: { schedule_id }
      });

      if (existingAppointment) {
        return next(ApiError.badRequest('Выбранное время уже занято'));
      }

      // Проверяем существование услуг
      const services = await Service.findAll({
        where: {
          id: service_ids
        }
      });

      if (services.length !== service_ids.length) {
        return next(ApiError.badRequest('Одна или несколько услуг не найдены'));
      }

      // Создаем запись
      const appointment = await Appointment.create({
        date_time: schedule.date_time,
        client_id,
        employee_id: schedule.employee_id,
        schedule_id,
        status: 'pending'
      });

      // Добавляем услуги к записи
      await appointment.addServices(services);

      // Получаем полную информацию о созданной записи
      const createdAppointment = await Appointment.findByPk(appointment.id, {
        include: [
          {
            model: Service,
            through: { attributes: [] }
          },
          {
            model: Employee,
            attributes: ['id', 'name']
          }
        ]
      });

      return res.json(createdAppointment);
    } catch (e) {
      console.error('Ошибка при создании записи:', e);
      return next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res) {
    const appointments = await Appointment.findAll();
    return res.json(appointments);
  }

  async deleteOne(req, res) {
    const { id } = req.params;
    const appointment = await Appointment.destroy({ where: { id } });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.json({ message: 'Appointment deleted successfully' });
  }

  async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      const { date_time, employee_id, schedule_id, service_ids, status } = req.body;
      const client_id = req.user.id; // Получаем ID клиента из токена

      // Проверяем существование записи
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return next(ApiError.notFound('Запись не найдена'));
      }

      // Проверяем, что клиент пытается изменить свою запись
      if (appointment.client_id !== client_id) {
        return next(ApiError.forbidden('Нельзя изменять записи других клиентов'));
      }

      // Проверяем существование мастера
      const employee = await Employee.findByPk(employee_id);
      if (!employee) {
        return next(ApiError.badRequest('Мастер не найден'));
      }

      // Проверяем существование расписания
      const schedule = await Schedule.findByPk(schedule_id);
      if (!schedule) {
        return next(ApiError.badRequest('Расписание не найдено'));
      }

      // Проверяем, что выбранный мастер соответствует мастеру в расписании
      if (schedule.employee_id !== employee_id) {
        return next(ApiError.badRequest('Выбранный мастер не соответствует мастеру в расписании'));
      }

      // Обновляем запись
      await appointment.update({
        date_time,
        employee_id,
        schedule_id,
        status
      });

      // Если указаны услуги, обновляем их
      if (service_ids) {
        const services = await Service.findAll({
          where: {
            id: service_ids
          }
        });
        await appointment.setServices(services);
      }

      // Получаем обновленную запись
      const updatedAppointment = await Appointment.findByPk(id, {
        include: [
          {
            model: Service,
            through: { attributes: [] }
          },
          {
            model: Employee,
            attributes: ['id', 'name', 'position']
          }
        ]
      });

      return res.json(updatedAppointment);
    } catch (e) {
      console.error('Ошибка при обновлении записи:', e);
      return next(ApiError.internal(e.message));
    }
  }

  // Получение доступных дат
  async getAvailableDates(req, res, next) {
    try {
      // Получаем все записи в расписании
      const schedules = await Schedule.findAll({
        where: {
          is_available: true
        },
        include: [{
          model: Employee,
          attributes: ['id', 'name']
        }],
        order: [['date_time', 'ASC']]
      });

      // Получаем все существующие записи
      const appointments = await Appointment.findAll({
        attributes: ['schedule_id']
      });

      // Создаем множество занятых расписаний
      const bookedScheduleIds = new Set(appointments.map(a => a.schedule_id));

      // Фильтруем доступные даты
      const availableDates = schedules
        .filter(schedule => !bookedScheduleIds.has(schedule.id))
        .map(schedule => ({
          id: schedule.id,
          date_time: schedule.date_time,
          employee: schedule.Employee
        }));

      return res.json({ dates: availableDates });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // Получение записей пользователя
  async getUserAppointments(req, res, next) {
    try {
      const client_id = req.user.id;
      
      const appointments = await Appointment.findAll({
        where: { client_id },
        include: [
          {
            model: Service,
            through: { attributes: [] }
          },
          {
            model: Employee,
            attributes: ['id', 'name']
          }
        ],
        order: [['date_time', 'DESC']]
      });

      return res.json(appointments);
    } catch (e) {
      console.error('Ошибка при получении записей пользователя:', e);
      return next(ApiError.internal(e.message));
    }
  }
}

module.exports = new AppointmentController();