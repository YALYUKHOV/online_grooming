const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

exports.createService = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newService = await Service.create({ name, description, price });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error });
  }
};

exports.getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.name = name;
    service.description = description;
    service.price = price;
    
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};


exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy();
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};
