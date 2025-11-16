const prisma = require('../utils/prisma');

const getAllProjects = async (req, res) => {
  try {
    const { 
      search, 
      status, 
      sortBy = 'deadline', 
      sortOrder = 'asc',
      page = 1,
      limit = 10
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { client: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              name: true,
              company: true,
              email: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: { tasks: true, invoices: true }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take
      }),
      prisma.project.count({ where })
    ]);

    res.json({
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        client: true,
        user: true,
        tasks: true,
        invoices: true
      }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, budget, deadline, status, clientId } = req.body;
    const userId = req.user.id;

    if (!title || !budget || !deadline || !clientId) {
      return res.status(400).json({ error: 'Title, budget, deadline, and clientId are required' });
    }

    const client = await prisma.client.findUnique({
      where: { id: parseInt(clientId) }
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        budget: parseFloat(budget),
        deadline: new Date(deadline),
        status: status || 'ongoing',
        clientId: parseInt(clientId),
        userId
      },
      include: {
        client: true,
        user: true
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, budget, deadline, status, clientId } = req.body;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (budget) updateData.budget = parseFloat(budget);
    if (deadline) updateData.deadline = new Date(deadline);
    if (status) updateData.status = status;
    if (clientId) updateData.clientId = parseInt(clientId);

    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        client: true,
        user: true
      }
    });

    res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};

