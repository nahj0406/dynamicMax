import {useState, useEffect, Suspense, useRef } from 'react'
import './css/App.css'
import './css/style.css'
import { Route, Routes, Link } from 'react-router-dom'
import useInitialLenis from './customHook/useInitialLenis'
import useIsMobile from './customHook/useIsMobile'

// 페이지
import Header from './components/Header/Header';
import MainSec from './sections/MainSec/MainSec'
import Section01 from './sections/Section01/Section01'
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
  const isMobile = useIsMobile();

  useInitialLenis();

  useEffect(() => {
    Splitting();
    window.scrollTo(0, 0);
  }, []);


  // gsap 업데이트 -------------------------------------------------
  useEffect(() => {
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => ScrollTrigger.update(), 200);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);
  
  


  // pc 모바일 구간 바뀔때마다 새로고침 ----------------------------------
  useEffect(() => {
    const handleResize = () => {
      const reloadSize = window.innerWidth <= 768;

      // 현재 상태와 이전 상태가 다르면 새로고침
      if (reloadSize !== prevIsMobile.current) {
        window.location.reload();
      }

      // 현재 상태 저장
      prevIsMobile.current = reloadSize;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const components = [
    <MainSec />,
    <Section01 />,
    <Section02 />,
    <Section03 />,
    <Section04 />,
  ]


  return (
    <div id='App'>
      {/* 헤더 */}
      <Header/>
      
      {/* 메인 */}

      {
        !isMobile ? (
          <>
            <section className='bg_container'>
              <MainSec />
              <Section01 />
            </section>
            <Section02 />
            <Section03 />
            <Section04 />
            <Footer/>
          </>
        ) : (
          <>
            {/* {
              components.map((item, i) => {
                return (
                  <FullpageSection key={i} style={{ minHeight: '100dvh',}}>
                    {item}
                  </FullpageSection>
                )
              })
            } */}
          </>
        )
      }
      
    </div>
  )
}

export default App
