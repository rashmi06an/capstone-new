import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { analyticsAPI } from '../lib/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const params = {};
      if (dateRange.startDate) params.startDate = dateRange.startDate;
      if (dateRange.endDate) params.endDate = dateRange.endDate;
      
      const response = await analyticsAPI.getIncome(params);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <Layout>
        <div className="text-center text-neon-blue">Loading...</div>
      </Layout>
    );
  }

  const incomeChartData = {
    labels: analytics.income.trend.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Income',
        data: analytics.income.trend.map((item) => item.amount),
        borderColor: '#00f0ff',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const projectStatusData = {
    labels: ['Completed', 'Ongoing'],
    datasets: [
      {
        data: [analytics.projects.completed, analytics.projects.ongoing],
        backgroundColor: ['#10b981', '#3b82f6'],
      },
    ],
  };

  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [
          analytics.tasks.completed,
          analytics.tasks.inProgress || 0,
          analytics.tasks.pending,
        ],
        backgroundColor: ['#10b981', '#3b82f6', '#6b7280'],
      },
    ],
  };

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neon-blue">Analytics</h1>
          <div className="flex gap-4">
            <input
              type="date"
              className="input-field"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              placeholder="Start Date"
            />
            <input
              type="date"
              className="input-field"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              placeholder="End Date"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card">
            <h3 className="text-gray-400 text-sm mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-neon-blue">
              ${analytics.income.total.toFixed(2)}
            </p>
          </div>
          <div className="glass-card">
            <h3 className="text-gray-400 text-sm mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-yellow-400">
              ${analytics.income.pending.toFixed(2)}
            </p>
          </div>
          <div className="glass-card">
            <h3 className="text-gray-400 text-sm mb-2">Task Completion Rate</h3>
            <p className="text-3xl font-bold text-green-400">
              {analytics.productivity.completionRate.toFixed(1)}%
            </p>
          </div>
          <div className="glass-card">
            <h3 className="text-gray-400 text-sm mb-2">Project Completion Rate</h3>
            <p className="text-3xl font-bold text-silver">
              {analytics.productivity.projectCompletionRate.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4 text-silver">Monthly Income Trend</h2>
            <Line
              data={incomeChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: { color: '#fff' },
                  },
                },
                scales: {
                  x: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  },
                  y: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  },
                },
              }}
            />
          </div>

          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4 text-silver">Project Status</h2>
            <Doughnut
              data={projectStatusData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: { color: '#fff' },
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="glass-card">
          <h2 className="text-xl font-bold mb-4 text-silver">Task Status Distribution</h2>
          <Doughnut
            data={taskStatusData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: { color: '#fff' },
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

