import { useState, useEffect, useRef, useLayoutEffect, Suspense } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './Section02.module.css'
import ImgTag from '../../components/ImgTag/ImgTag'
import { Swiper, SwiperSlide } from 'swiper/react';
import ScrollOut from 'scroll-out';

import InViewMotion from '../../Flamer_Element/InViewMotion'


// img
import Product01 from '../../img/Sec2/sec2_product01.png';
import icon01 from '../../img/Sec2/sec2_icon01.png';
import icon02 from '../../img/Sec2/sec2_icon02.png';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Section02() {

  const containerRef = useRef(null);
  const productRef = useRef(null);
  const unitRef = useRef(null);

  useEffect(() => {
    Splitting();

    const elements = Array.from(document.querySelectorAll(`.${styles.scAni}`));

    const scrollOutInstance = ScrollOut({
        targets: `.${styles.scAni}`,
        threshold: 0.5,
        once: true, // 요소가 한 번만 감지되도록 설정
        onShown: function (el) {
          // 요소가 뷰포트에 들어왔을 때 실행
          const index = elements.indexOf(el);

          const isWideScreen = window.innerWidth <= 1920 && window.innerWidth >= 768;
          const delay = isWideScreen
          ? (index >= 4 ? 100 : index * 700)
          : index * 200;

          setTimeout(() => {
            el.classList.add(`${styles.animate}`); // 순차적으로 animate 클래스 추가
          }, delay);
        },
    });

    return () => {
        scrollOutInstance.teardown(); // ScrollOut 인스턴스 정리
    };
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top+=100 top-=3%",
          end: "bottom-=25% 50%",
          pin: true,
          scrub: 1,
        });

        gsap.set(unitRef.current, { opacity: 1 });

        gsap.to(unitRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=100 top-=3%",
            end: "bottom-=25% 50%",
            scrub: true,
            // markers: true,
          },
        });
      }, containerRef);

      return () => ctx.revert(); // ✅ 미디어 해제 시 정리
    });

    mm.add("(max-width: 768px)", () => {
      const ctx = gsap.context(() => {
        // 모바일용 ScrollTrigger 설정 (필요 시)
      }, containerRef);

      return () => ctx.revert(); // ✅ 미디어 해제 시 정리
    });

    return () => mm.revert(); // ✅ 컴포넌트 언마운트 시 전체 정리
  }, []);


  return (
    <section id={styles.Section02}>

      <div className={styles.pin_wrapper} ref={containerRef}>
        <section className='containerV1'>
  
          <div className={`${styles.titleBox} ${styles.scAni} titleBox`}>
            <p>차별화된 배터리 및 액상 <span>잔량 확인 시스템</span></p>
            <h2 data-splitting className='HemiHead'>VISIBILITY</h2>
          </div>
  
          <figure className={styles.product} ref={productRef}>
            <ImgTag clsName={styles.img} src={Product01} alt={'다이나믹 맥스 충전량 표시'} />
            <div className={styles.scroll_unit} ref={unitRef}></div>
          </figure>
  
  
    
          <div className={`${styles.itemBox} ${styles.scAni}`}>
            <article>
              <ImgTag clsName={styles.icon} src={icon01} alt={'잔량 표시'} />
              <p>
                액상 부족 시 필터에서 올라오는 불편한 미각적
                경험을 해소하기 위해 다이나믹 맥스는 <span>직관
                적인 용량 표시</span>로 잔량 확인이 가능합니다.
              </p>
            </article>
  
            <article>
              <ImgTag clsName={styles.icon} src={icon02} alt={'배터리 표시'} />
              <p>
                다이나믹 맥스는 <span>배터리 상태를 수치화</span>하여 사용자가
                보다 편리하고 효율적으로 사용할 수 있도록 사용자 
                경험을 획기적으로 향상시켰습니다.
              </p>
            </article>
          </div>
    
        </section>
      </div>

    </section>
  )
}

export default Section02
