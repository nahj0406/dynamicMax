import { useState, useEffect, useRef, Suspense, useLayoutEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './Section03.module.css'
import ImgTag from '../../components/ImgTag/ImgTag'
import { Swiper, SwiperSlide } from 'swiper/react';
import ScrollOut from 'scroll-out';


// img
import Product01 from '../../img/Sec3/sec3_product01.png';
import Product02 from '../../img/Sec3/sec3_product02.png';
import Product03 from '../../img/Sec3/sec3_product03.png';

import coilIcon from '../../img/Sec3/sec3_coil.png';
import plusIcon from '../../img/plus_icon.png';
import cottonIcon from '../../img/Sec3/sec3_cotton.png';

import worldImg from '../../img/Sec3/sec3_world.png';

import slide01  from '../../img/Sec3/sec3_slide01.png';
import slide02  from '../../img/Sec3/sec3_slide02.png';
import slide03  from '../../img/Sec3/sec3_slide03.png';
import slide04  from '../../img/Sec3/sec3_slide04.png';
import slide05  from '../../img/Sec3/sec3_slide05.png';


// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Section03() {

  const containerRef = useRef(null);
  const containerV1Ref = useRef(null);
  const triggerRef = useRef(null);
  const content01Ref = useRef(null);
  const content02Ref = useRef(null);
  const slideRef = useRef(null);

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
    const ctx = gsap.context(() => {
      const contentHeight = containerV1Ref.current.offsetHeight;
      const containerRefHeight = containerRef.current.offsetHeight;
      const triggerHeight = triggerRef.current.offsetHeight;

      const totalHeight = contentHeight + triggerHeight;
      containerRef.current.style.height = `${totalHeight}px`;

      console.log(containerRefHeight);

      // pin 설정
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=100 top-=3%",
        // end: `+=${triggerHeight}`,
        end: `bottom top`,
        pin: true,
        markers: true,
        invalidateOnRefresh: true,
      });

      // timeline 생성
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=100 top-=3%",
          end: `bottom top`,  // pin과 동일한 종료 지점
          scrub: 1,
          // markers: true,
          invalidateOnRefresh: true,
        },
      });

      // 요소 위치 초기화 → 자연스럽게 시작
      tl.fromTo(triggerRef.current,
        { y: triggerHeight },
        { y: -(triggerHeight - 200) }
      );

      // slideRef 슬라이드 애니메이션
      tl.fromTo(slideRef.current,
        { xPercent: 50 },
        { xPercent: -20 },
        ">" // 이전 애니메이션과 동시에 시작하려면 "<", 그 이후에 하려면 ">"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);



  const slideData = [
    {
      url: slide01,
      name: 'metallic',
      text: '메탈릭 재질을 활용한 한층 더 고급스러운 외형',
    },

    {
      url: slide02,
      name: 'Dual Mesh Coil',
      text: '듀얼 메쉬 코일 적용으로 더 진하고 풍부한 맛표현',
    },

    {
      url: slide03,
      name: 'compact size',
      text: '가벼운 무게와 컴팩트한 사이즈에서 오는 심플함',
    },

    {
      url: slide04,
      name: 'ample capacity',
      text: '하루종일 베이핑 해도 걱정없는 10ml 넉넉한 용량',
    },

    {
      url: slide05,
      name: 'versatility port',
      text: `범용성 높은 C-type 충전 포트와 직관적인 배터리 잔량 표시`,
    },
  ]

  return (
    <section id={styles.Section03}>
        <div className={styles.pin_wrapper} ref={containerRef}>
          <video autoPlay muted loop playsInline preload="auto" id={styles.bgVideo}>
            <source src={'/video/sec3_video.mp4'} type="video/mp4" />
          </video>
          <section className='containerV1' ref={containerV1Ref}>
    
            <div className={`${styles.titleBox} ${styles.scAni} titleBox`}>
              <p>다이나믹만이 가진 <span>특별함</span></p>
              <h2 data-splitting className='HemiHead'>SPECIALITY</h2>
            </div>
    
            <figure className={styles.product}>
              <ImgTag clsName={styles.img3} src={Product03} alt={'다이나믹 맥스 모델3'} />
              <ImgTag clsName={styles.img1} src={Product01} alt={'다이나믹 맥스 모델1'} />
              <ImgTag clsName={styles.img2} src={Product02} alt={'다이나믹 맥스 모델2'} />
            </figure>
      
          </section>
    
          <section className={styles.triggerBox} ref={triggerRef}>
            
            <article className={styles.content01} ref={content01Ref}>
              <figure className={styles.iconBox}>
                <ImgTag clsName={styles.img} src={coilIcon} alt={'코일 아이콘'} />
                <ImgTag clsName={styles.img} src={plusIcon} alt={'플러스 아이콘'} />
                <ImgTag clsName={styles.img} src={cottonIcon} alt={'솜 아이콘'} />
              </figure>
    
              <p>
                듀얼 매쉬 코일과 친환경 펄프솜을 사용하여 <br />
                높은 무화량과 풍부한 맛표현으로 사용자에게 <br />
                더욱 깊은 만족도를  가져다 줍니다.
              </p>
            </article>
    
            <article className={styles.content02} ref={content02Ref}>
              <figure className={styles.iconBox}>
                <ImgTag clsName={styles.img} src={worldImg} alt={'월드 인터네셔널 이미지'} />
              </figure>
    
              <p>
                월드인터네셔널은 10년 경력의 전자담배 기업으로 <br />
                타사제품의 액상을 그대로 사용하는 다른 제품들과 달리 <br />
                자체 개발한 맞춤형 액상을 사용합니다.
              </p>
            </article>
    
    
            <article className={styles.content_Slide} ref={slideRef}>
              {
                slideData.map((item, index) => {
                  return(
                    <figure className={styles.item} key={index}>
                      <ImgTag clsName={styles.img} src={item.url} alt={item.name} />
    
                      <div className={styles.textBox}>
                        <h5>{item.name}</h5>
                        <figcaption>{item.text}</figcaption>
                      </div>
                    </figure>
                  )
                })
              }
            </article>
    
    
          </section>
        </div>
    </section>
  )
}

export default Section03
