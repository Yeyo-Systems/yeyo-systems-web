'use client';

import { useEffect } from 'react';
import { getFirebaseAnalytics } from '@/infrastructure/config/firebase';

export function FirebaseAnalytics() {
  useEffect(() => {
    getFirebaseAnalytics();
  }, []);

  return null;
}
