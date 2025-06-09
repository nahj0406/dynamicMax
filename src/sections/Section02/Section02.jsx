import { useState, useEffect, useRef, Suspense } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './Section02.module.css'
import ImgTag from '../../components/ImgTag/ImgTag'
import { Swiper, SwiperSlide } from 'swiper/react';

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

  const containerRef = useRef();
  const productRef = useRef();
  const unitRef = useRef();

  useEffect(() => {
     Splitting();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const addActiveClass = () => unitRef.current.classList.add(styles.active);
      const removeActiveClass = () => unitRef.current.classList.remove(styles.active);

      // 부모 요소를 고정
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=150 top",
        end: `+=800`, // 필요에 따라 조절
        pin: true,
        // markers: true,
      });

      // 자식 요소를 y값으로 위로 이동
      gsap.to(unitRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=150 top",
          end: `+=800`,
          // scrub: true,
          onEnter: addActiveClass,
          onLeave: removeActiveClass,
          onEnterBack: addActiveClass,
          onLeaveBack: removeActiveClass,
          markers: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={styles.Section02}>

      <div className={styles.pin_wrapper} ref={containerRef}>
        <section className='containerV1'>
  
          <InViewMotion>
            <div className={`${styles.titleBox} titleBox`}>
              <p>차별화된 배터리 및 액상 <span>잔량 확인 시스템</span></p>
              <h2 className='HemiHead'>VISIBILITY</h2>
            </div>
          </InViewMotion>
  
          <figure className={styles.product} ref={productRef}>
            <ImgTag clsName={styles.img} src={Product01} alt={'다이나믹 맥스 충전량 표시'} />
            <div className={styles.scroll_unit} ref={unitRef}></div>
          </figure>
  
  
    
          <div className={styles.itemBox}>
            <article>
              <ImgTag clsName={styles.icon} src={icon01} alt={'잔량 표시'} />
              <p>
                액상 부족 시 필터에서 올라오는 불편한 미각적 <br />
                경험을 해소하기 위해 다이나믹 맥스는 <span>직관 <br />
                적인 용량 표시</span>로 잔량 확인이 가능합니다.
              </p>
            </article>
  
            <article>
              <ImgTag clsName={styles.icon} src={icon02} alt={'배터리 표시'} />
              <p>
                다이나믹 맥스는 <span>배터리 상태를 수치화</span>하여 사용자가 <br />
                보다 편리하고 효율적으로 사용할 수 있도록 사용자 <br />
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
