import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAuthToken } from '../lib/auth';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const publicRoutes = ['/', '/login', '/signup'];

  useEffect(() => {
    if (!router.isReady) return;

    const token = getAuthToken();
    const isPublicRoute = publicRoutes.includes(router.pathname);

    if (!token && !isPublicRoute) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router.isReady, router.pathname]);

  if (loading || !router.isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-neon-blue text-xl">Loading...</div>
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;

