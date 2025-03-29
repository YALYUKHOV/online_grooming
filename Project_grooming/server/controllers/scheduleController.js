const {Schedule} = require('../models/models');
const ApiError = require('../error/ApiError');

class ScheduleController{
    async create(req, res) {
      const { employeeId, date_time } = req.body;
      const schedule = await Schedule.create({ employeeId, date_time });
      return res.json(schedule);
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
      const { employeeId, date_time } = req.body;
      const schedule = await Schedule.update({ employeeId, date_time }, { where: { id } });
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
      return res.json({ message: 'Schedule updated successfully' });
    }
  }
  
  module.exports = new ScheduleController();