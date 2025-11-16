const prisma = require('../utils/prisma');

const generateInvoiceId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `INV-${timestamp}-${random}`;
};

const getAllInvoices = async (req, res) => {
  try {
    const { 
      search, 
      status, 
      sortBy = 'issueDate', 
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};
    
    if (search) {
      where.OR = [
        { invoiceId: { contains: search } },
        { client: { name: { contains: search } } }
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
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
          project: {
            select: {
              id: true,
              title: true,
              budget: true
            }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take
      }),
      prisma.invoice.count({ where })
    ]);

    res.json({
      invoices,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const invoice = await prisma.invoice.findUnique({
      where: { id: parseInt(id) },
      include: {
        client: true,
        project: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createInvoice = async (req, res) => {
  try {
    const { amount, dueDate, status, clientId, projectId } = req.body;

    if (!amount || !dueDate || !clientId || !projectId) {
      return res.status(400).json({ error: 'Amount, dueDate, clientId, and projectId are required' });
    }

    const client = await prisma.client.findUnique({
      where: { id: parseInt(clientId) }
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const invoice = await prisma.invoice.create({
      data: {
        invoiceId: generateInvoiceId(),
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        status: status || 'unpaid',
        clientId: parseInt(clientId),
        projectId: parseInt(projectId)
      },
      include: {
        client: true,
        project: true
      }
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, issueDate, dueDate, status, clientId, projectId } = req.body;

    const invoice = await prisma.invoice.findUnique({
      where: { id: parseInt(id) }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const updateData = {};
    if (amount) updateData.amount = parseFloat(amount);
    if (issueDate) updateData.issueDate = new Date(issueDate);
    if (dueDate) updateData.dueDate = new Date(dueDate);
    if (status) updateData.status = status;
    if (clientId) updateData.clientId = parseInt(clientId);
    if (projectId) updateData.projectId = parseInt(projectId);

    const updatedInvoice = await prisma.invoice.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        client: true,
        project: true
      }
    });

    res.json(updatedInvoice);
  } catch (error) {
    console.error('Update invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id: parseInt(id) }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    await prisma.invoice.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
};

