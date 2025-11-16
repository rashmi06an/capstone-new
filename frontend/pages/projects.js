import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { projectsAPI, clientsAPI } from '../lib/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    status: 'ongoing',
    clientId: '',
  });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    sortBy: 'deadline',
    sortOrder: 'asc',
  });

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll(filters);
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
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
      if (editingProject) {
        await projectsAPI.update(editingProject.id, formData);
      } else {
        await projectsAPI.create(formData);
      }
      setShowModal(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        status: 'ongoing',
        clientId: '',
      });
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      budget: project.budget.toString(),
      deadline: project.deadline.split('T')[0],
      status: project.status,
      clientId: project.clientId.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neon-blue">Projects</h1>
          <button
            onClick={() => {
              setEditingProject(null);
              setFormData({
                title: '',
                description: '',
                budget: '',
                deadline: '',
                status: 'ongoing',
                clientId: '',
              });
              setShowModal(true);
            }}
            className="btn-primary"
          >
            Add Project
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
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            className="input-field"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="budget">Sort by Budget</option>
          </select>
          <select
            className="input-field"
            value={filters.sortOrder}
            onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="text-center text-neon-blue">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="glass-card">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description || 'No description'}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="text-gray-400">Client:</span> {project.client.name}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-400">Budget:</span> ${project.budget}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-400">Deadline:</span>{' '}
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    project.status === 'completed' ? 'bg-green-500' :
                    project.status === 'ongoing' ? 'bg-blue-500' : 'bg-red-500'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-neon-blue hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="glass-card w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">
                {editingProject ? 'Edit Project' : 'Add Project'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  required
                  className="input-field w-full"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  className="input-field w-full"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Budget"
                  required
                  className="input-field w-full"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Deadline"
                  required
                  className="input-field w-full"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
                <select
                  className="input-field w-full"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
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
                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingProject ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingProject(null);
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

