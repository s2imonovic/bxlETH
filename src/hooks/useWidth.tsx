import { useState, useEffect, useMemo } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const hookResult = useMemo(() => {
    return width;
  }, [width]);

  return hookResult;
};
