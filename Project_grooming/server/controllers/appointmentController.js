const Appointment = require('../models/Appointment');

// Получить все записи
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Ошибка получения записи:', error);
    res.status(500).json({ message: 'Ошибка получения записи', error });
  }
};

// Создать новую запись
exports.createAppointment = async (req, res) => {
  const { client_id, employee_id, date, status } = req.body;

  try {
    const newAppointment = await Appointment.create({ client_id, employee_id, date, status });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Ошибка создания записи:', error);
    res.status(500).json({ message: 'Ошибка создания записи', error });
  }
};

// Получить запись по ID
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: 'Запись не найдена' });
    }
  } catch (error) {
    console.error('Ошибка выбора записи:', error);
    res.status(500).json({ message: 'Ошибка выбора записи', error });
  }
};

// Обновить запись
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { client_id, employee_id, date, status } = req.body;

  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }

    appointment.client_id = client_id;
    appointment.employee_id = employee_id;
    appointment.date = date;
    appointment.status = status;
    
    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Ошибка при обновлении записи:', error);
    res.status(500).json({ message: 'Ошибка при обновлении записи', error });
  }
};

// Удалить запись
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Запись не найдена' });
    }

    await appointment.destroy();
    res.status(200).json({ message: 'Запись удалена' });
  } catch (error) {
    console.error('Ошибка при удалении записи:', error);
    res.status(500).json({ message: 'Ошибка при удалении записи', error });
  }
};
