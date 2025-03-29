const {Employee} = require('../models/models');
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
}

module.exports = new EmployeeController();