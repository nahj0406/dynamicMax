import {useState, useRef, useEffect} from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import Logo from '../../img/logo.png';

import Splitting from 'splitting';


function Header() {

   const linkAdd = [
      {
         url: 'https://dynamic.worldintl.co.kr/',
         name: 'DYNAMIC I',
      },
      {
         url: '/',
         name: 'DYNAMIC max',
      },
      {
         url: '/',
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
                        return (
                           <li key={index}>
                              <Link to={item.url} target='_blank'>
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