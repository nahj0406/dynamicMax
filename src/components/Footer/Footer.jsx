import {useState, useRef, useEffect} from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import Logo from '@/img/dynamicMax/footer_logo.png';
import MobLogo from '@/img/dynamicMax/mob_footer_logo.png';
import useIsMobile from '@/customHook/useIsMobile'


function Footer({slideActive, swiperRef}) {
   const isMobile = useIsMobile();
   const tel = '+82 010-2349-8677';
   const [showTopButton, setShowTopButton] = useState(false);

   useEffect(() => {
      if(isMobile) return;
      
      const scrollEnd = () => {
         const scrollTop = window.scrollY;
         const windowHeight = window.innerHeight;
         const documentHeight = document.documentElement.scrollHeight;
         const isBottom = scrollTop + windowHeight >= documentHeight - 10; // 10px 여유

         setShowTopButton(isBottom);

      }

      window.addEventListener('scroll', scrollEnd);
      return () => window.removeEventListener('scroll', scrollEnd);
   }, []);

   const clickTop = () => {
      if(!isMobile) {
         window.scrollTo({top: 0, behavior: 'smooth'});
      } else {
         if(swiperRef.current) {
            swiperRef.current.slideTo(0, 0);
         }
      }
   }

   return (
      <>
         <footer id={styles.footer} className={`${slideActive ? styles.slideActive : ''}`}>

            {
               isMobile && (
                  <div className={styles.mob_container}>
                     <h1 id={styles.logo}>
                        <a href={`https://www.worldintl.co.kr/`} target={'_blank'}>
                           <img src={MobLogo} alt="월드인터네셔널 로고" />
                        </a>
                     </h1>
                     <p>10년간의 노하우가 담긴 <br className={styles.br}/> 최상급의 품질을 제공합니다.</p>
                  </div>
               )
            }

            <div className={`${styles.footer_container} containerV1`}>
               <h1 id={styles.logo}>
                  <img src={Logo} alt="월드인터네셔널 로고" />
               </h1>
               <a href={`tel:${tel}`}>{tel}</a>
               <p>월드 다이나믹 맥스 일회용 전자담배</p>
               <p className={styles.copy}>COPYRIGHT. WORLD INTERNATIONAL. All Rights Reserved.</p>
            </div>

            <div className={`${styles.topbutton} ${showTopButton ? styles.active : ''}`} onClick={clickTop}>
               <span>TOP</span>
            </div>
         </footer>
      </>
   )
}

export default Footer;