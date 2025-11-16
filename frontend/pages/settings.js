import Layout from '../components/Layout';
import { useAuth } from '../lib/auth';

export default function Settings() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold mb-6 text-neon-blue">Settings</h1>

        <div className="glass-card max-w-2xl">
          <h2 className="text-xl font-bold mb-4 text-silver">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <div className="input-field bg-gray-700">
                {user?.name || 'N/A'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="input-field bg-gray-700">
                {user?.email || 'N/A'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <div className="input-field bg-gray-700">
                {user?.role || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card max-w-2xl mt-6">
          <h2 className="text-xl font-bold mb-4 text-silver">About Freelanch</h2>
          <p className="text-gray-400">
            Freelanch is a smart freelance management system designed to help freelancers
            manage their clients, projects, tasks, and invoices all in one place.
          </p>
          <p className="text-gray-400 mt-4">
            Version: 1.0.0
          </p>
        </div>
      </div>
    </Layout>
  );
}

