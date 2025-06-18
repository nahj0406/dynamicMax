import React, {useState, useEffect, useRef, Suspense } from 'react'
import '@/css/dynamicMax/style.css'
import '@/css/dynamicMax/index.css'
import useInitialLenis from '@/customHook/useInitialLenis'
import useIsMobile from '@/customHook/useIsMobile'

// 페이지
import MainSec from '@/sections/MainSec/MainSec'
import Section01 from '@/sections/Section01/Section01'
import Section02 from '@/sections/Section02/Section02'
import Section03 from '@/sections/Section03/Section03'
import Section03_2 from '@/sections/Section03_2/Section03_2'
import Section04 from '@/sections/Section04/Section04'
import Footer from '@/components/Footer/Footer';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);




function App({ onSlideChange }) {  
  const isMobile = useIsMobile();
  const swiperRef = useRef(null);
  const previousIndex = useRef(0);

  useInitialLenis(); //leins 라이브러리

  useEffect(() => {
    Splitting();
    window.scrollTo(0, 0);
  }, []);


  // gsap 사이즈 변경때마다 2초 지연후 재업데이트 -------------------------------------------------
  useEffect(() => {
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);


  // 슬라이드안에 비디오 있으면 슬라이드 active 될때 비디오 재생
  const SlideVideoSttart = (swiper) => {
    const slides = swiper.slides;

    slides.forEach((slide, index) => {
      const video = slide.querySelector('video');
      if (video) {
        video.pause();
        video.currentTime = 0;
        if (index === swiper.activeIndex) {
          video.play();
        }
      }
    });
  };
  
  


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
    <Section03_2 />,
    <Section04 />,
    <Footer/>
  ]


  return (
    <div id='App'>

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
            {/* <Suspense fallback={<div>로딩중...</div>} ></Suspense> */}
            <Swiper
              direction={'vertical'}
              slidesPerView={1}
              speed={300}
              spaceBetween={0}
              mousewheel={true}
              preloadImages={false}
              lazy={true}
              lazyPreloadPrevNext={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Mousewheel]}
              onSlideChange={(swiper) => {SlideVideoSttart(swiper);}}
              onSlideChangeTransitionEnd={(swiper) => {
                setActiveIndex(swiper.activeIndex);

                if(isMobile) { // 슬라이드 이동할때마다 onslidechange 값 header 보내는 코드
                  const current = swiper.activeIndex;
                  const prev = previousIndex.current;

                  if (current > prev) {
                    onSlideChange('down');
                  } else if (current < prev) {
                    onSlideChange('up');
                  }
                  previousIndex.current = current;
                }
              }}
              // Pagination
              className="mobSwiper"
            >
              {
                components.map((item, i) => {
                  return (
                    <SwiperSlide key={i} className={`swiper_0${i}`}>
                      {React.cloneElement(item, { slideActive: slideActiveIndex === i, swiperRef: swiperRef, })}
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
