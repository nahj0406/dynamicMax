import { useState, useEffect, useRef, Suspense, useLayoutEffect } from 'react'
import styles from './Section03.module.css'
import ImgTag from '@/components/ImgTag/ImgTag'
import useScrollOut from '@/customHook/useScrollOut'
import { useSelector } from 'react-redux';
import useIsMobile from '@/customHook/useIsMobile'


// img
import Product01 from '@/img/Sec3/sec3_product01.png';
import Product02 from '@/img/Sec3/sec3_product02.png';
import Product03 from '@/img/Sec3/sec3_product03.png';

import coilIcon from '@/img/Sec3/sec3_coil.png';
import plusIcon from '@/img/plus_icon.png';
import cottonIcon from '@/img/Sec3/sec3_cotton.png';

import worldImg from '@/img/Sec3/sec3_world.png';



// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Section03({slideActive}) {

  const sec3Data = useSelector((state) => state.sec3Data);

  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const containerV1Ref = useRef(null);
  const triggerBgRef = useRef(null);
  const triggerRef = useRef(null);
  const content01Ref = useRef(null);
  const content02Ref = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    Splitting();
  }, []);

  useScrollOut({
    targetClass: styles.scAni,
    animateCalss: styles.animate,
  });


  useLayoutEffect(() => {

    const mm = gsap.matchMedia();
    const viewportWidth = window.innerWidth;
    // const content01Height = content01Ref.current.offsetHeight;
    // const content02Height = content02Ref.current.offsetHeight;

    // requestAnimationFrame(() => {
        mm.add("(min-width: 769px)", () => {
          const ctx = gsap.context(() => {
            // pin 설정
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top+=100 top-=3%",
              end: `+=${(viewportWidth * 2)}`,
              pin: true,
              invalidateOnRefresh: true,
              // markers: true,
            });

            gsap.to(triggerBgRef.current, {
              backgroundColor: "rgba(0,0,0,0.8)",
              duration: 1,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "top+=10% top",
                scrub: 1,
              },
            });

            // timeline 생성
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top+=100 top-=3%",
                end: `+=${(viewportWidth * 2)}`,
                scrub: 1,
                markers: true,
                invalidateOnRefresh: true,
              },
            });

            // 요소 위치 세팅
            gsap.set(content01Ref.current, {opacity: 0,});
            gsap.set(content02Ref.current, {opacity: 0,});
            gsap.set(slideRef.current, {xPercent: 65});

            tl.to(content01Ref.current, {opacity: 1,},);
            // tl.to(content01Ref.current, {opacity: 1,},);
            tl.to(content01Ref.current, {opacity: 0,},);

            tl.to(content02Ref.current, {opacity: 1,},);
            // tl.to(content02Ref.current, {opacity: 1,},);
            tl.to(content02Ref.current, {opacity: 0,},);
            tl.to(slideRef.current, {xPercent: -80, duration: 8,},);

          }, containerRef);

          return () => ctx.revert(); // ✅ 미디어 해제 시 정리
        });      
    // })

    return () => mm.revert();
  }, []);


  return (
    <section id={styles.Section03} className={`${slideActive ? styles.slideActive : ''}`}>
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

          <div className={styles.triggerBg} ref={triggerBgRef}></div>
    
          <section className={styles.triggerBox} ref={triggerRef}>
            
            <article className={styles.content01} ref={content01Ref}>
              <figure className={styles.iconBox}>
                <ImgTag clsName={styles.img} src={coilIcon} alt={'코일 아이콘'} />
                <ImgTag clsName={styles.img} src={plusIcon} alt={'플러스 아이콘'} />
                <ImgTag clsName={styles.img} src={cottonIcon} alt={'솜 아이콘'} />
              </figure>
    
              <p data-splitting>
                듀얼 매쉬 코일과 친환경 펄프솜을 사용하여
                높은 무화량과 풍부한 맛표현으로 사용자에게
                더욱 깊은 만족도를 가져다 줍니다!
              </p>
            </article>
    
            <article className={styles.content02} ref={content02Ref}>
              <figure className={styles.iconBox}>
                <ImgTag clsName={styles.img} src={worldImg} alt={'월드 인터네셔널 이미지'} />
              </figure>
    
              <p data-splitting>
                월드인터네셔널은 10년 경력의 전자담배 기업으로
                타사제품의 액상을 그대로 사용하는 다른 제품들과 달리
                자체 개발한 맞춤형 액상을 사용합니다!
              </p>
            </article>
    
            {
              !isMobile && (
                <article className={styles.content_Slide} ref={slideRef}>
                  {
                    sec3Data.map((item, index) => {
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
              )
            }
    
          </section>
        </div>
    </section>
  )
}

export default Section03
