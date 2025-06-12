import React, {useState, useEffect, Suspense, useRef } from 'react'
import '@/css/App.css'
import '@/css/style.css'
import { Route, Routes, Link } from 'react-router-dom'
import useInitialLenis from '@/customHook/useInitialLenis'
import useIsMobile from '@/customHook/useIsMobile'

// 페이지
import Header from '@/components/Header/Header';
import MainSec from '@/sections/MainSec/MainSec'
import Section01 from '@/sections/Section01/Section01'
import Section02 from '@/sections/Section02/Section02'
import Section03 from '@/sections/Section03/Section03'
import Section04 from '@/sections/Section04/Section04'
import Footer from '@/components/Footer/Footer';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);





function App() {  
  const isMobile = useIsMobile();

  useInitialLenis(); //leins 라이브러리

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
  const prevIsMobile = useRef(window.innerWidth <= 768);
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


  const [slideActiveIndex, setActiveIndex] = useState(0);
  const components = [ // 모바일용 fullpage 배열
    <MainSec />,
    <Section01 />,
    <Section02 />,
    <Section03 />,
    <Section04 />,
    <Footer/>
  ]


  return (
    <div id='App'>
      {/* 헤더 */}
      <Header/>

      {/* 메인 */}
      { 
        !isMobile ? ( // desktop -------------------------------------------------------------------------
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
        ) : ( // mobile -------------------------------------------------------------------------
          <>
          {/* <Suspense fallback={<Fallback />}></Suspense> */}
      {/* <Routes>
        <Route path='/' element={<MainSec />} />
      </Routes> */}
            <Swiper
              direction={'vertical'}
              slidesPerView={1}
              spaceBetween={0}
              mousewheel={true}
              // pagination={{
              //   clickable: true,
              // }}
              modules={[Mousewheel]}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              // Pagination
              className="mobSwiper"
            >
              {
                components.map((item, i) => {
                  return (
                    <SwiperSlide key={i} className={`swiper_0${i}`}>
                      {React.cloneElement(item, { slideActive: slideActiveIndex === i })}
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </>
        )
      }
      
    </div>
  )
}

export default App
