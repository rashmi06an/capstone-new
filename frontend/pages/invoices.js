import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { invoicesAPI, projectsAPI, clientsAPI } from '../lib/api';
import { generateInvoicePDF } from '../utils/invoicePDF';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    dueDate: '',
    status: 'unpaid',
    clientId: '',
    projectId: '',
  });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    sortBy: 'issueDate',
    sortOrder: 'desc',
  });

  useEffect(() => {
    fetchInvoices();
    fetchProjects();
    fetchClients();
  }, [filters]);

  const fetchInvoices = async () => {
    try {
      const response = await invoicesAPI.getAll(filters);
      setInvoices(response.data.invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getAll();
      setClients(response.data.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingInvoice) {
        await invoicesAPI.update(editingInvoice.id, formData);
      } else {
        await invoicesAPI.create(formData);
      }
      setShowModal(false);
      setEditingInvoice(null);
      setFormData({
        amount: '',
        dueDate: '',
        status: 'unpaid',
        clientId: '',
        projectId: '',
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      amount: invoice.amount.toString(),
      dueDate: invoice.dueDate.split('T')[0],
      status: invoice.status,
      clientId: invoice.clientId.toString(),
      projectId: invoice.projectId.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        await invoicesAPI.delete(id);
        fetchInvoices();
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  const handleDownloadPDF = async (invoiceId) => {
    try {
      const response = await invoicesAPI.getById(invoiceId);
      generateInvoicePDF(response.data);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neon-blue">Invoices</h1>
          <button
            onClick={() => {
              setEditingInvoice(null);
              setFormData({
                amount: '',
                dueDate: '',
                status: 'unpaid',
                clientId: '',
                projectId: '',
              });
              setShowModal(true);
            }}
            className="btn-primary"
          >
            Add Invoice
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
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <select
            className="input-field"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="issueDate">Sort by Issue Date</option>
            <option value="amount">Sort by Amount</option>
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

        {/* Invoices List */}
        {loading ? (
          <div className="text-center text-neon-blue">Loading...</div>
        ) : (
          <div className="glass-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4">Invoice ID</th>
                    <th className="text-left p-4">Client</th>
                    <th className="text-left p-4">Project</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Due Date</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-800">
                      <td className="p-4">{invoice.invoiceId}</td>
                      <td className="p-4">{invoice.client.name}</td>
                      <td className="p-4">{invoice.project.title}</td>
                      <td className="p-4">${invoice.amount.toFixed(2)}</td>
                      <td className="p-4">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          invoice.status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDownloadPDF(invoice.id)}
                          className="text-neon-blue hover:underline mr-4"
                        >
                          Download PDF
                        </button>
                        <button
                          onClick={() => handleEdit(invoice)}
                          className="text-neon-blue hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(invoice.id)}
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
                {editingInvoice ? 'Edit Invoice' : 'Add Invoice'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  className="input-field w-full"
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  required
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <select
                  className="input-field w-full"
                  value={formData.projectId}
                  onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                  required
                >
                  <option value="">Select Project</option>
                  {projects
                    .filter((p) => p.clientId.toString() === formData.clientId || !formData.clientId)
                    .map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  required
                  step="0.01"
                  className="input-field w-full"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  required
                  className="input-field w-full"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
                <select
                  className="input-field w-full"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingInvoice ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingInvoice(null);
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

