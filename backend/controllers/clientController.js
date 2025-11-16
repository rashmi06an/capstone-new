const prisma = require('../utils/prisma');

const getAllClients = async (req, res) => {
  try {
    const { 
      search, 
      industry, 
      region, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (industry) {
      where.industry = industry;
    }
    
    if (region) {
      where.region = region;
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        include: {
          _count: {
            select: { projects: true }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take
      }),
      prisma.client.count({ where })
    ]);

    res.json({
      clients,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
      include: {
        projects: true,
        invoices: true
      }
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createClient = async (req, res) => {
  try {
    const { name, company, email, phone, industry, region, paymentStatus } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const client = await prisma.client.create({
      data: {
        name,
        company,
        email,
        phone,
        industry,
        region,
        paymentStatus: paymentStatus || 'Pending'
      }
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company, email, phone, industry, region, paymentStatus } = req.body;

    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) }
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const updatedClient = await prisma.client.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(company !== undefined && { company }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(industry !== undefined && { industry }),
        ...(region !== undefined && { region }),
        ...(paymentStatus !== undefined && { paymentStatus })
      }
    });

    res.json(updatedClient);
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) }
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await prisma.client.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};

