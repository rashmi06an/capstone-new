import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAuthToken } from '../lib/auth';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="glass-card max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-silver bg-clip-text text-transparent">
          Freelanch
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          A Smart Freelance Management System
        </p>
        <p className="text-gray-400 mb-8">
          Manage your clients, projects, tasks, and invoices all in one place.
          Stay organized, meet deadlines, and track your earnings effortlessly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="btn-primary">
            Login
          </Link>
          <Link href="/signup" className="btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

