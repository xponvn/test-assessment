'use client';
import { useAuth } from '@test-assessment/ui-auth-protect';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RouteGuard({ children }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      router.push('/login');
    }
  }, [auth.user]);
  return children;
}
