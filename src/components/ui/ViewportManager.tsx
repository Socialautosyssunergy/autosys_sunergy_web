'use client';

import { useEffect } from 'react';

const ViewportManager: React.FC = () => {
  useEffect(() => {
    // Set viewport height for mobile browsers to handle bottom navigation properly
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set on load
    setVH();

    // Update on resize and orientation change
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Add safe area CSS custom properties
    if ('CSS' in window && 'supports' in window.CSS) {
      const supportsSafeArea = window.CSS.supports('padding-bottom', 'env(safe-area-inset-bottom)');
      document.documentElement.classList.toggle('supports-safe-area', supportsSafeArea);
    }

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return null;
};

export default ViewportManager;
