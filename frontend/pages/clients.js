import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { clientsAPI } from '../lib/api';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    region: '',
    paymentStatus: 'Pending',
  });
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    region: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  useEffect(() => {
    fetchClients();
  }, [filters]);

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getAll(filters);
      setClients(response.data.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await clientsAPI.update(editingClient.id, formData);
      } else {
        await clientsAPI.create(formData);
      }
      setShowModal(false);
      setEditingClient(null);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        industry: '',
        region: '',
        paymentStatus: 'Pending',
      });
      fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      company: client.company || '',
      email: client.email,
      phone: client.phone || '',
      industry: client.industry || '',
      region: client.region || '',
      paymentStatus: client.paymentStatus,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        await clientsAPI.delete(id);
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neon-blue">Clients</h1>
          <button
            onClick={() => {
              setEditingClient(null);
              setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                industry: '',
                region: '',
                paymentStatus: 'Pending',
              });
              setShowModal(true);
            }}
            className="btn-primary"
          >
            Add Client
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="input-field"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="input-field"
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            className="input-field"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="createdAt">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
          <select
            className="input-field"
            value={filters.sortOrder}
            onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {/* Clients List */}
        {loading ? (
          <div className="text-center text-neon-blue">Loading...</div>
        ) : (
          <div className="glass-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Company</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Industry</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b border-gray-800">
                      <td className="p-4">{client.name}</td>
                      <td className="p-4">{client.company || '-'}</td>
                      <td className="p-4">{client.email}</td>
                      <td className="p-4">{client.industry || '-'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          client.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}>
                          {client.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleEdit(client)}
                          className="text-neon-blue hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="glass-card w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">
                {editingClient ? 'Edit Client' : 'Add Client'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="input-field w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Company"
                  className="input-field w-full"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="input-field w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="input-field w-full"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Industry"
                  className="input-field w-full"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Region"
                  className="input-field w-full"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                />
                <select
                  className="input-field w-full"
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingClient ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingClient(null);
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

