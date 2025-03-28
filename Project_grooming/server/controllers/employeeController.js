const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания сотрудника" });
  }
};

const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Employee.update(req.body, { where: { id } });
  
      if (updated) {
        const updatedEmployee = await Employee.findByPk(id);
        res.json(updatedEmployee);
      } else {
        res.status(404).json({ error: "Сотрудник не найден" });
      }
    } catch (error) {
      res.status(500).json({ error: "Ошибка обновления сотрудника" });
    }
  };
  
  const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Employee.destroy({ where: { id } });
  
      if (deleted) {
        res.json({ message: "Сотрудник удален" });
      } else {
        res.status(404).json({ error: "Сотрудник не найден" });
      }
    } catch (error) {
      res.status(500).json({ error: "Ошибка удаления сотрудника" });
    }
  };

  module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };
