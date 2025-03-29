const {Service} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class ServiceController{
  async create(req, res, next) {
    try{
      const { name, description, price } = req.body;
      const{ img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      // перемещаем файл в папку static, resolve адаптирует указанный путь к ОС
      //дирнейм - путь к текущему файлу, в данном случае к контроллеру
      //две точки возврат на директорию назад 
      //статик - папка, куда мы перемещаем файл
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
  
      const device = await Service.create({ name, description, price, img: fileName });
  
      return res.json(device);

    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
    

  }

  async getAll(req, res) {
    const {name} = req.query;
    let services;
    if(name){
      services = await Service.findAll({where: {name}})
    }
    if (!name){
      services = await Service.findAll()
    }
    return res.json(services)
  }

  async deleteOne(req, res) {
    const { id } = req.params;
    const service = await Service.destroy({ where: { id } });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    return res.json({ message: 'Service deleted successfully' });
  }

  async updateOne(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const service = await Service.update({ name, description, price }, { where: { id } });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    return res.json({ message: 'Service updated successfully' });
  }
}

module.exports = new ServiceController();