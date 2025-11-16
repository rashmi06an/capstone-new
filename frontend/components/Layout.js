import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth';

export default function Layout({ children }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/clients', label: 'Clients' },
    { href: '/projects', label: 'Projects' },
    { href: '/tasks', label: 'Tasks' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="glass border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center text-2xl font-bold text-neon-blue">
                Freelanch
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${
                      router.pathname === item.href
                        ? 'border-neon-blue text-neon-blue'
                        : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-4">
                {user?.name || 'User'}
              </span>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

