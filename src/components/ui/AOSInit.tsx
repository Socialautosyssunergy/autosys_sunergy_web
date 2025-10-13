'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-out-cubic', // Easing function
      once: true, // Animation happens only once
      offset: 100, // Offset from the original trigger point
      delay: 0, // Delay in milliseconds
      anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
    });

    // Refresh AOS when component updates
    return () => {
      AOS.refresh();
    };
  }, []);

  return null;
}
