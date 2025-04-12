const {Employee, Appointment, Service, Client} = require('../models/models');
const ApiError = require('../error/ApiError');

class EmployeeController{
  async create(req, res) {
    const { name, position, phone, email } = req.body;
    const employee = await Employee.create({ name, position, phone, email });
    return res.json(employee);
  }

  async getAll(req, res) {
    const employees = await Employee.findAll();
    return res.json(employees);
  }

  async deleteOne(req, res) {
    const { id } = req.params;
    const employee = await Employee.destroy({ where: { id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json({ message: 'Employee deleted successfully' });
  }

  async updateOne(req, res) {
    const { id } = req.params;
    const { name, position, phone, email } = req.body;
    const employee = await Employee.update({ name, position, phone, email }, { where: { id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json({ message: 'Employee updated successfully' });
  }

  async getEmployeeAppointments(req, res, next) {
    try {
      const { id } = req.params;
      
      // Проверяем существование сотрудника
      const employee = await Employee.findOne({ where: { id } });
      if (!employee) {
        return next(ApiError.notFound('Сотрудник не найден'));
      }

      // Получаем записи с дополнительной информацией
      const appointments = await Appointment.findAll({
        where: { employee_id: id },
        include: [
          {
            model: Service,
            through: { attributes: [] },
          },
          {
            model: Client,
            attributes: ['id', 'name', 'phone', 'email']
          }
        ],
        order: [['date_time', 'ASC']]
      });

      // Возвращаем результат с информацией о сотруднике
      return res.json({
        employee: {
          id: employee.id,
          name: employee.name,
          position: employee.position
        },
        appointments: appointments || []
      });
    } catch (e) {
      console.error('Ошибка при получении записей:', e);
      return next(ApiError.internal(e.message));
    }
  }
}

module.exports = new EmployeeController();