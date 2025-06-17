import {useState, useRef, useEffect} from 'react'
import styles from './header.module.css'
import { Link, useLocation } from 'react-router-dom'

// 커스텀훅
import useIsMobile from '@/customHook/useIsMobile'

// js라이브러리
import Splitting from 'splitting';

import LogoMax from '@/img/dynamicMax/logo.png';
import Logo1 from '@/img/dynamic1/logo.png';



function Header({ direction, isLastSlide }) {

   const [Logo, setLogo] = useState(LogoMax);
   const location = useLocation();
   const isMobile = useIsMobile();
   const headerRef = useRef(false);

   useEffect(() => {
      Splitting();
   });

   useEffect(() => { // route에 따라 로고 변경
    if(location.pathname == '/Dynamic01') {
      setLogo(Logo1);
    } else if(location.pathname == '/Dynamic03') {
      setLogo(LogoMax);
    } else {
      setLogo(LogoMax);
    }
  }, [location.pathname]);

   useEffect(() => { // header에 props로 받은 값으로 슬라이드 풀페이지 data 넘겨받기
      if(isMobile || location.pathname == '/Dynamic01') {
         const header = headerRef.current;
         if (!header) return;

         if (direction === 'down') {
         header.classList.add(styles.scroll_down);
         } else if (direction === 'up') {
         header.classList.remove(styles.scroll_down);
         }

         if(location.pathname == '/Dynamic01') {
            if (isLastSlide) {
            header.classList.add(styles.logoBlack);
            } else {
            header.classList.remove(styles.logoBlack);
            }
         }
      }
  }, [direction, isLastSlide]);

   const linkAdd = [
      {
         url: '/Dynamic01',
         name: 'DYNAMIC I',
      },
      {
         url: '/',
         name: 'DYNAMIC max',
      },
      {
         url: '/Dynamic03',
         name: 'DYNAMIC III',
      },
   ]




   return (
      <header id={styles.header} ref={headerRef}>
         <h1 id={styles.logo}>
            <a href={`/`} title="2025년 새롭게 출시된 전자담배 일회용 기기 다이나믹 DYNAMIC">
            {/* <span class="heading">2025년 새롭게 출시된 전자담배 일회용 기기 다이나믹 DYNAMIC</span> */}
            <img src={Logo} alt={Logo == LogoMax ? '다이나믹 맥스 로고' : '다이나믹 로고'} />
            </a>
         </h1>
         <nav>
           <ul className={styles.outerMenu}>
               {
                  linkAdd.map((item, index) => {
                     return (
                        <li key={index} className={`${location.pathname == item.url ? styles.on : ''}`}>
                           <Link to={item.url}>
                              <h5 data-splitting className={`HemiHead`}>{item.name}</h5>
                           </Link>
                        </li>
                     )
                  })
               }
            </ul>
         </nav>
      </header>
   )
}

{/* <header id={styles.header}>
         <div className={`${styles.headerContainer} containerV1`}>
            <h1 id={styles.logo} className={`${Logo == Logo1 ? 'logo1' : }`}>
               <a href={`/`} target={'_blank'}>
                  <img src={Logo} alt="다이나믹 맥스 로고" />
               </a>
            </h1>
            <nav>
               <ul className={styles.outerMenu}>
                  {
                     linkAdd.map((item, index) => {
                        const isComingSoon = !item.url || item.url === '/';

                        const handleClick = (e) => {
                          if (isComingSoon && index === 2) { // 🔥 세 번째 항목만 체크
                            e.preventDefault();
                            alert('출시 준비 중입니다!');
                          }
                        };

                        return (
                           <li key={index}>
                              <Link to={item.url} onClick={handleClick}>
                                 <h5 data-splitting className={`HemiHead`}>{item.name}</h5>
                              </Link>
                           </li>
                        )
                     })
                  }
               </ul>
            </nav>
         </div>
      </header> */}

export default Header;