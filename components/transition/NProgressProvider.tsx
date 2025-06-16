// components/NProgressProvider.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../../styles/nprogress-custom.css';


// Custom styling (optional)
NProgress.configure({ showSpinner: true , trickleSpeed: 100 });

export default function NProgressProvider() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500); // Artificial delay for better UX

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
