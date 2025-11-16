const prisma = require('../utils/prisma');

const getIncomeAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, period = 'monthly' } = req.query;
    
    const userId = req.user.id;
    
    const where = {
      project: {
        userId: userId
      }
    };

    if (startDate || endDate) {
      where.issueDate = {};
      if (startDate) where.issueDate.gte = new Date(startDate);
      if (endDate) where.issueDate.lte = new Date(endDate);
    }

    // Get all invoices for the user
    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        project: true
      }
    });

    // Calculate totals
    const totalIncome = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.amount, 0);

    const pendingPayments = invoices
      .filter(inv => inv.status === 'unpaid')
      .reduce((sum, inv) => sum + inv.amount, 0);

    // Get project statistics
    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        tasks: true,
        invoices: true
      }
    });

    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const ongoingProjects = projects.filter(p => p.status === 'ongoing').length;

    // Get task statistics
    const tasks = await prisma.task.findMany({
      where: { userId },
      include: {
        project: true
      }
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

    // Monthly income trend
    const monthlyIncome = {};
    invoices
      .filter(inv => inv.status === 'paid')
      .forEach(inv => {
        const month = new Date(inv.issueDate).toISOString().slice(0, 7); // YYYY-MM
        monthlyIncome[month] = (monthlyIncome[month] || 0) + inv.amount;
      });

    const incomeTrend = Object.entries(monthlyIncome)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));

    res.json({
      income: {
        total: totalIncome,
        pending: pendingPayments,
        trend: incomeTrend
      },
      projects: {
        total: totalProjects,
        completed: completedProjects,
        ongoing: ongoingProjects
      },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks
      },
      productivity: {
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
        projectCompletionRate: totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getIncomeAnalytics
};

