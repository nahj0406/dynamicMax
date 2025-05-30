import { useState, useEffect, useRef, Suspense } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './MainSec.module.css'


// 컴포넌트
import ImgTag from '../../componunts/ImgTag/ImgTag'


// img
import mainProduct from '../../img/MainSec/main_product 1.png';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function MainSec() {

  const containerRef = useRef(null);

  useEffect(() => {
     Splitting();

  }, []);

  return (
    <section id={styles.main_Section} ref={containerRef}>
      <div className={styles.banner_txtBox}>
        <h1 className={`${styles.banner_title_txt1} HemiHead`}>DYNAMIC</h1>
        <h1 className={`${styles.banner_title_txt2} HemiHead`}>max</h1> {/* flamer-motion 처리하기 */}
      </div>

      <div className={styles.sub_txtBox}><h4 className={styles.sub_txt}>만족의 기준을 바꾸다</h4></div>

      <figure className={styles.product}>
        <ImgTag src={mainProduct} alt={'다이나믹 맥스 제품 이미지'} />
      </figure>
    </section>
  )
}

export default MainSec
