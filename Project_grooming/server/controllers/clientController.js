const { Client, Appointment, Service, Employee, AppointmentService } = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const generateJwt = (id, name, email, phone) => {
  return jwt.sign(
    { id, name, email, phone },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
}

class UserController{
  async registration(req, res, next) {
    const { phone, name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'));
    }
    const candidate = await Client.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await Client.create({ name, email, phone, password: hashPassword });
    const token = generateJwt(user.id, user.name, user.email, user.phone);
    return res.json({token});
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await Client.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.name, user.email, user.phone);
    return res.json({token});
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.phone);
    return res.json({token});
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      const user = await Client.findByPk(userId);
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
      if (!isPasswordValid) {
        return next(ApiError.badRequest('Неверный текущий пароль'));
      }

      const hashPassword = await bcrypt.hash(newPassword, 5);
      await user.update({ password: hashPassword });

      return res.json({ message: 'Пароль успешно изменен' });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async logout(req, res, next) {
    try {
      // В реальном приложении здесь должна быть логика отзыва токена
      return res.json({ message: 'Вы успешно вышли из системы' });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async getClientAppointments(req, res, next) {
    try {
      const { id } = req.params;
      
      const appointments = await Appointment.findAll({
        where: { client_id: id },
        include: [
          {
            model: Service,
            through: { attributes: [] }, // Исключаем промежуточную таблицу из результата
          },
          {
            model: Employee,
            attributes: ['id', 'name', 'position']
          }
        ],
        order: [['date_time', 'ASC']]
      });

      if (!appointments) {
        return next(ApiError.notFound('Записи не найдены'));
      }

      return res.json(appointments);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, phone } = req.body;
      
      // Находим клиента по email или телефону
      const client = await Client.findOne({
        where: {
          [Op.or]: [
            { email: email },
            { phone: phone }
          ]
        }
      });

      if (!client) {
        return next(ApiError.notFound('Клиент не найден'));
      }

      // Генерируем новый временный пароль
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashPassword = await bcrypt.hash(tempPassword, 5);

      // Обновляем пароль в базе данных
      await client.update({ password: hashPassword });

      // В реальном приложении здесь должна быть отправка email/SMS с новым паролем
      // Для тестирования просто возвращаем новый пароль
      return res.json({ 
        message: 'Пароль успешно сброшен',
        tempPassword: tempPassword // В реальном приложении это поле нужно удалить
      });
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }
}

module.exports = new UserController();