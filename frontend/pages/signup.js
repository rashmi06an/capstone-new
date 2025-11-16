import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authAPI } from '../lib/api';
import { setAuthToken } from '../lib/auth';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Freelancer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First, try to signup
      const signupResponse = await authAPI.signup(formData);
      
      // If signup succeeds, try to auto-login
      try {
        const loginResponse = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
        setAuthToken(loginResponse.data.token);
        router.push('/dashboard');
      } catch (loginErr) {
        // Signup succeeded but login failed - redirect to login page
        setError('Account created successfully! Please login.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      // Signup failed
      const errorMessage = err.response?.data?.error || err.message || 'Signup failed. Please try again.';
      setError(errorMessage);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-neon-blue">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-2 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              required
              className="input-field w-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              className="input-field w-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              required
              className="input-field w-full"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              className="input-field w-full"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Freelancer">Freelancer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-neon-blue hover:underline">
            Login
          </Link>
        </p>
        <p className="mt-2 text-center">
          <Link href="/" className="text-silver hover:underline text-sm">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

