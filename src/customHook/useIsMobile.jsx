import { useState, useEffect } from 'react';

function useIsMobile(breakpoint = 768) {
  const getWidth = () =>
    window.visualViewport?.width || window.innerWidth;

  const [isMobile, setIsMobile] = useState(getWidth() <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getWidth() <= breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;