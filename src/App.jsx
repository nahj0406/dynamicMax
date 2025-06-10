import { useEffect, Suspense, useRef } from 'react'
import './css/App.css'
import './css/style.css'
import { Route, Routes, Link } from 'react-router-dom'
// import {motion, useMotionValue, useTransform} from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// 커스텀 컴포넌트
import SplitMotion from './Flamer_Element/SplitMotion';
import InViewMotion from './Flamer_Element/InViewMotion';

// 페이지
import Header from './components/Header/Header';
import MainSec from './sections/MainSec/MainSec'
import Section02 from './sections/Section02/Section02'
import Section03 from './sections/Section03/Section03'
import Section04 from './sections/Section04/Section04'
import Footer from './components/Footer/Footer';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);





function App() {

  const prevIsMobile = useRef(window.innerWidth <= 768);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;

      // 현재 상태와 이전 상태가 다르면 새로고침
      if (isMobile !== prevIsMobile.current) {
        window.location.reload();
      }

      // 현재 상태 저장
      prevIsMobile.current = isMobile;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => { // gsap 업데이트
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => ScrollTrigger.update(), 200);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => { // lenis 적용, 첫화면에서 스크롤 제어
    let lenis;

    // document.body.style.overflowY = 'hidden'; // 초기에 스크롤 차단

    // // 3초 후 스크롤 허용
    // const enableScrollTimeout = setTimeout(() => {
    //   document.body.style.overflow = '';
    // }, 3500);

    // const timeout = setTimeout(() => {
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
    // }, 2000); // 2초 뒤에 실행

    return () => {
      // clearTimeout(enableScrollTimeout);
      // clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 제거
      if (lenis) lenis.destroy(); // Lenis가 존재할 때만 destroy
    };
  }, []);

  useEffect(() => {
     Splitting();
  }, []);

  return (
    <div id='App'>
      {/* <Suspense fallback={<Fallback />}></Suspense> */}
      {/* <Routes>
        <Route path='/' element={<MainSec />} />
      </Routes> */}

      {/* 헤더 */}
      <Header/>
      
      {/* 메인 */}
      <MainSec />
      <Section02 />
      <Section03 />
      <Section04 />

      {/* 푸터 */}
      <Footer/>
    </div>
  )
}

export default App
