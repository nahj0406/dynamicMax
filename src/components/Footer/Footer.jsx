import {useState, useRef, useEffect} from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import Logo from '../../img/footer_logo.png';


function Footer() {

   const tel = '+82 010-2349-8677';

   return (
      <footer id={styles.footer}>
         <div className={`${styles.footer_container} containerV1`}>
            <h1 id={styles.logo}>
               <img src={Logo} alt="월드인터네셔널 로고" />
            </h1>
            <a href={`tel:${tel}`}>{tel}</a>
            <p>월드 다이나믹 맥스 일회용 전자담배</p>
            <p className={styles.copy}>COPYRIGHT. WORLD INTERNATIONAL. All Rights Reserved.</p>
         </div>
      </footer>
   )
}

export default Footer;