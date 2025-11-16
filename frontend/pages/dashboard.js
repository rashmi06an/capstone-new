import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { analyticsAPI, projectsAPI, tasksAPI, invoicesAPI } from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    income: { total: 0, pending: 0 },
    projects: { total: 0, completed: 0, ongoing: 0 },
    tasks: { total: 0, completed: 0, pending: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analytics, projects, tasks, invoices] = await Promise.all([
        analyticsAPI.getIncome(),
        projectsAPI.getAll({ limit: 5 }),
        tasksAPI.getAll({ limit: 5 }),
        invoicesAPI.getAll({ limit: 5 }),
      ]);

      setStats({
        income: analytics.data.income || { total: 0, pending: 0 },
        projects: analytics.data.projects || { total: 0, completed: 0, ongoing: 0 },
        tasks: analytics.data.tasks || { total: 0, completed: 0, pending: 0 },
        recentProjects: projects.data?.projects || [],
        recentTasks: tasks.data?.tasks || [],
        recentInvoices: invoices.data?.invoices || [],
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats({
        income: { total: 0, pending: 0 },
        projects: { total: 0, completed: 0, ongoing: 0 },
        tasks: { total: 0, completed: 0, pending: 0 },
        recentProjects: [],
        recentTasks: [],
        recentInvoices: [],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-neon-blue">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold mb-6 text-neon-blue">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card">
            <h3 className="text-gray-400 text-sm mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-neon-blue">
              ${stats.income.total.toFixed(2)}
            </p>
          </div>
          <div className="glass-card">
            <h3 className="text-gray-400 text-sm mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-yellow-400">
              ${stats.income.pending.toFixed(2)}
            </p>
          </div>
          <div className="glass-card">
            <h3 className="text-gray-400 text-sm mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-silver">
              {stats.projects.total}
            </p>
          </div>
          <div className="glass-card">
            <h3 className="text-gray-400 text-sm mb-2">Completed Tasks</h3>
            <p className="text-3xl font-bold text-green-400">
              {stats.tasks.completed}/{stats.tasks.total}
            </p>
          </div>
        </div>

        {/* Recent Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4 text-silver">Recent Projects</h2>
            <div className="space-y-3">
              {stats.recentProjects && stats.recentProjects.length > 0 ? (
                stats.recentProjects.map((project) => (
                  <div key={project.id} className="border-b border-gray-700 pb-3">
                    <p className="font-semibold">{project.title}</p>
                    <p className="text-sm text-gray-400">
                      {project.client?.name} • ${project.budget}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No projects yet</p>
              )}
            </div>
          </div>

          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4 text-silver">Recent Tasks</h2>
            <div className="space-y-3">
              {stats.recentTasks && stats.recentTasks.length > 0 ? (
                stats.recentTasks.map((task) => (
                  <div key={task.id} className="border-b border-gray-700 pb-3">
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-gray-400">{task.project?.title}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.status === 'completed' ? 'bg-green-500' : 
                      task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No tasks yet</p>
              )}
            </div>
          </div>

          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4 text-silver">Recent Invoices</h2>
            <div className="space-y-3">
              {stats.recentInvoices && stats.recentInvoices.length > 0 ? (
                stats.recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="border-b border-gray-700 pb-3">
                    <p className="font-semibold">{invoice.invoiceId}</p>
                    <p className="text-sm text-gray-400">
                      {invoice.client?.name} • ${invoice.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      invoice.status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No invoices yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

