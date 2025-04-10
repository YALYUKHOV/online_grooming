const { Appointment, Service, Schedule, Employee, AppointmentService } = require('../models/models');
const ApiError = require('../error/ApiError');

class AppointmentController{
  async create(req, res, next) {
    try {
      const { date_time, employee_id, schedule_id, service_ids } = req.body;
      const client_id = req.user.id; // Получаем ID клиента из токена

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

      // Проверяем существование услуг
      const services = await Service.findAll({
        where: {
          id: service_ids
        }
      });

      if (services.length !== service_ids.length) {
        return next(ApiError.badRequest('Одна или несколько услуг не найдены'));
      }

      // Проверяем доступность времени
      const existingAppointment = await Appointment.findOne({
        where: {
          schedule_id,
          employee_id
        }
      });

      if (existingAppointment) {
        return next(ApiError.badRequest('Это время уже занято'));
      }

      // Создаем запись
      const appointment = await Appointment.create({
        date_time,
        client_id,
        employee_id,
        schedule_id,
        status: 'запланировано'
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
            attributes: ['id', 'name', 'position']
          }
        ]
      });

      return res.json(createdAppointment);
    } catch (e) {
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

  async updateOne(req, res) {
    const { id } = req.params;
    const { clientId, employeeId, scheduleId, serviceId, status } = req.body;
    const appointment = await Appointment.update({ clientId, employeeId, scheduleId, serviceId, status }, { where: { id } });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.json({ message: 'Appointment updated successfully' });
  }
}

module.exports = new AppointmentController();