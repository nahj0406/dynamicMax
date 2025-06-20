import { useState, useEffect, useRef} from 'react'
import styles from './MainSec.module.css'
import useIsMobile from '@/customHook/useIsMobile'


// 컴포넌트
import ImgTag from '@/components/ImgTag/ImgTag'


// img
import mainProduct from '@/img/dynamicMax/MainSec/main_product 1.png';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function MainSec() {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const [banner, bannerSet] = useState('');
  

  useEffect(() => {
    Splitting();
    const bannerTimerAni = setTimeout(() => {
      bannerSet('true');
    }, (!isMobile ? 1500 : 1000));

    return () => clearTimeout(bannerTimerAni);

  }, []);

  return (
    
    <section id={styles.main_Section} className={`${banner === 'true' ? styles.bannerStart : ''}`} ref={containerRef}>
      {/* { !isMobile && <StartBanner />} */}
      <StartBanner />

      <div className={styles.banner_txtBox}>
        <h1 className={`${styles.banner_title_txt1} ${styles.banner_title} HemiHead`}>DYNAMIC</h1>

        <div className={styles.unit_box}>
          <h1 className={`${styles.banner_title_txt2} ${styles.scale_txt} HemiHead`}>max</h1>
          <h1 className={`${styles.banner_title_txt2} HemiHead`}>max</h1>
        </div>
      </div>

      <div className={styles.sub_txtBox}>
        <h4 className={styles.sub_txt}>만족의 기준을 바꾸다</h4>
      </div>

      <figure className={styles.product}>
        <ImgTag src={mainProduct} alt={'다이나믹 맥스 제품 이미지'} />
      </figure>

      <div className={styles.scroll_down}>
        <p>SCROLL DOWN</p>
        <div className={styles.line}></div>
      </div>
    </section>
  )
}

function StartBanner() {
  return (
    <div className={styles.startBanner}>
      {
        [1,2,3,4,5,6,7].map((item, i)=> {
          return(
            <div key={i} className={styles.banner_piece} style={{'--i-delay' : `${i}`}}></div>
          )
        })
      }
    </div>
  )
}

export default MainSec
