import { useEffect } from 'react';
import useIsMobile from './useIsMobile';
import Lenis from '@studio-freight/lenis';


function useInitialLenis() {
   const isMobile = useIsMobile();

   useEffect(() => { // lenis 적용, 첫화면에서 스크롤 제어
      if (isMobile) return;

      let lenis;

      document.body.style.overflowY = 'hidden'; // 초기에 스크롤 차단

      // 3초 후 스크롤 허용
      const enableScrollTimeout = setTimeout(() => {
      document.body.style.overflow = '';
      }, 3500);

      const timeout = setTimeout(() => {
      lenis = new Lenis({
         smoothWheel: true,
         smoothTouch: true,
         wheelMultiplier: 1,
         touchMultiplier: 0.2,
         // touchMultiplier: 0.5,
      });

      function raf(time) {
         lenis.raf(time);
         requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      }, 3500); // 3.5초 뒤에 실행

      return () => {
      clearTimeout(enableScrollTimeout);
      clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 제거
      if (lenis) lenis.destroy(); // Lenis가 존재할 때만 destroy
      };

  }, [isMobile]);
}


export default useInitialLenis