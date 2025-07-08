'use client';

import { useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoadingBar = () => {
  const [loading, setLoading] = useState(false);

 
  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-700 transform transition-transform duration-300 ${
        loading ? 'translate-x-0 w-full' : 'translate-x-[-100%] w-0'
      }`}
      style={{ zIndex: 9999 }}
    />
  );
};

export default LoadingBar;
