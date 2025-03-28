const  Client  = require("../models/Client");

exports.createClient = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newClient = await Client.create({ name, email, phone });
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Error creating client', error });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};

exports.getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Error fetching client', error });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.name = name;
    client.email = email;
    client.phone = phone;
    
    await client.save();
    res.status(200).json(client);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Error updating client', error });
  }
};

exports.deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.destroy();
    res.status(200).json({ message: 'Client deleted' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Error deleting client', error });
  }
};
