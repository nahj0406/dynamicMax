import { useEffect, useRef, useLayoutEffect, Suspense } from 'react'
import styles from './Section02.module.css'
import ImgTag from '@/components/ImgTag/ImgTag'
import useScrollOut from '@/customHook/useScrollOut'


// img
import Product01 from '@/img/Sec2/sec2_product01.png';
import icon01 from '@/img/Sec2/sec2_icon01.png';
import icon02 from '@/img/Sec2/sec2_icon02.png';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Section02({slideActive}) {

  const containerRef = useRef(null);
  const productRef = useRef(null);
  const unitRef = useRef(null);
  const item01Ref = useRef(null);
  const item02Ref = useRef(null);

  useEffect(() => {
    Splitting();
  }, []);

  useScrollOut({
    targetClass: styles.scAni,
    animateCalss: styles.animate,
  });

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const viewportHeight = window.innerHeight;

    mm.add("(min-width: 769px)", () => {
      const startData = `top+=100 top-=3%`;
      const endData = `+=${viewportHeight}`;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: startData,
          end: endData,
          pin: true,
          scrub: 1,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: startData,
            end: endData,
            scrub: true,
            // markers: true,
          },
        });

        tl.fromTo(productRef.current, {opacity: 0, scale: 1.1}, { opacity: 1, scale: 1});
        tl.fromTo(unitRef.current, {opacity: 1,}, { opacity: 0}, '+=0.5');
        tl.fromTo(item01Ref.current, {opacity: 0, y: 100,}, { opacity: 1, y: 0,});
        tl.fromTo(item02Ref.current, {opacity: 0, y: 100,}, { opacity: 1, y: 0,});

      }, containerRef);

      return () => ctx.revert(); // ✅ 미디어 해제 시 정리
    });

    return () => mm.revert(); // ✅ 컴포넌트 언마운트 시 전체 정리
  }, []);


  return (
    <section id={styles.Section02} className={`${slideActive ? styles.slideActive : ''}`}>

      <div className={styles.pin_wrapper} ref={containerRef}>
        <div className={`${styles.scrollout_bg} ${styles.scAni}`}></div>

        <section className='containerV1'>
  
          <div className={`${styles.titleBox} ${styles.scAni} titleBox`}>
            <p>차별화된 배터리 및 액상 <span>잔량 확인 시스템</span></p>
            <h2 data-splitting className='HemiHead'>VISIBILITY</h2>
          </div>
  
          <figure className={`${styles.product} ${styles.scAni}`} ref={productRef}>
            <ImgTag clsName={styles.img} src={Product01} alt={'다이나믹 맥스 충전량 표시'} />
            <div className={`${styles.scroll_unit}`} ref={unitRef}></div>
          </figure>
  
  
    
          <div className={`${styles.itemBox} ${styles.scAni}`}>
            <article ref={item01Ref} className={`${styles.scAni}`}>
              <ImgTag clsName={styles.icon} src={icon01} alt={'잔량 표시'} />
              <p>
                액상 부족 시 필터에서 올라오는 불편한 미각적
                경험을 해소하기 위해 다이나믹 맥스는 <span>직관적인 용량 표시</span>로 잔량 확인이 가능합니다.
              </p>
            </article>
  
            <article ref={item02Ref} className={`${styles.scAni}`}>
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
