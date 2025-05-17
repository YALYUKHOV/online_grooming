const {Service} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class ServiceController{
  async create(req, res, next) {
    try{
      const { name, description, price, duration } = req.body;
      const{ img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      // перемещаем файл в папку static, resolve адаптирует указанный путь к ОС
      //дирнейм - путь к текущему файлу, в данном случае к контроллеру
      //две точки возврат на директорию назад 
      //статик - папка, куда мы перемещаем файл
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
  
      const device = await Service.create({ name, description, price, img: fileName, duration });
  
      return res.json(device);

    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
    

  }

  async getAll(req, res, next) {
    try {
      const services = await Service.findAll({
        order: [['name', 'ASC']]
      });
      return res.json(services);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const service = await Service.findOne({
        where: { id }
      });
      if (!service) {
        return next(ApiError.notFound('Услуга не найдена'));
      }
      return res.json(service);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const service = await Service.findOne({
        where: { id }
      });

      if (!service) {
        return next(ApiError.notFound('Услуга не найдена'));
      }

      await service.destroy();
      return res.json({ message: 'Услуга успешно удалена' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, duration } = req.body;
      
      const service = await Service.findOne({
        where: { id }
      });

      if (!service) {
        return next(ApiError.notFound('Услуга не найдена'));
      }

      await service.update({
        name,
        description,
        price,
        duration
      });

      return res.json(service);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ServiceController();