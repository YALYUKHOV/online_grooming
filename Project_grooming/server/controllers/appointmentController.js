const { Appointment } = require('../models/models');
const ApiError = require('../error/ApiError');

class AppointmentController{
  async create(req, res) {
    const { clientId, employeeId, scheduleId, serviceId, status } = req.body;
    const appointment = await Appointment.create({ clientId, employeeId, scheduleId, serviceId, status });
    return res.json(appointment);
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