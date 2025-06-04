import { useState, useEffect, useRef, Suspense } from 'react'
import './css/App.css'
import './css/style.css'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// 커스텀 컴포넌트
import SplitMotion from './Flamer_Element/SplitMotion';
import InViewMotion from './Flamer_Element/InViewMotion';

// 페이지
import Header from './componunts/Header/Header';
import MainSec from './sections/MainSec/MainSec'
import Section01 from './sections/Section01/Section01'
import Section02 from './sections/Section02/Section02'

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);





function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  useEffect(() => {
    // Lenis 초기화
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1, // 휠로 이동되는 거리 감소
      touchMultiplier: 0.5, // 터치로 이동되는 거리 감소
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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

      {/* 메인 베너 */}
      <div className='test_bg'>
        <MainSec />
        <Section01 />
      </div>
      {/* <Section02 /> */}
    </div>
  )
}

export default App
