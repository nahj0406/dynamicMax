import {useState, useRef, useEffect} from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import Logo from '../../img/logo.png';

import Splitting from 'splitting';


function Header() {

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
         url: '',
         name: 'DYNAMIC III',
      },
   ]

   useEffect(() => {
      Splitting();
   })

   return (
      <header id={styles.header}>
         <div className={`${styles.headerContainer} containerV1`}>
            <h1 id={styles.logo}>
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
                              <Link to={item.url} target={'_blank'} onClick={handleClick}>
                                 <h5 data-splitting className={`HemiHead`}>{item.name}</h5>
                              </Link>
                           </li>
                        )
                     })
                  }
               </ul>
            </nav>
         </div>
      </header>
   )
}

export default Header;