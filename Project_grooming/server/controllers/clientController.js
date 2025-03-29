const { Client } = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const { phone, name, email, password } = req.body;
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
}

module.exports = new UserController();