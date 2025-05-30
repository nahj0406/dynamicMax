import { useState, useEffect, useRef, Suspense } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './Section02.module.css'
import ImgTag from '../../componunts/ImgTag/ImgTag'
import { Swiper, SwiperSlide } from 'swiper/react';


// img
import Product01 from '../../img/Sec2/sec2_product01.png';
import icon01 from '../../img/Sec2/sec2_icon01.png';
import icon02 from '../../img/Sec2/sec2_icon02.png';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Section01() {

  useEffect(() => {
     Splitting();
  }, []);

  return (
    <section id={styles.Section02}>

      <section className='containerV1'>

        <div className={styles.titleBox}>
          <p>차별화된 배터리 및 액상 <span>잔량 확인 시스템</span></p>
          <h2 className='HemiHead'>VISIBILITY</h2>
        </div>

        <figure className={styles.product}>
          <ImgTag clsName={styles.img} src={Product01} alt={'다이나믹 맥스 충전량 표시'} />
        </figure>


  
        <div className={styles.itemBox}>
          <article>
            <ImgTag clsName={styles.icon} src={icon01} alt={'잔량 표시'} />
            <p>
              기존의 전자담배기기, 다이나믹 시리즈는 액상 부족 시 필터에서 올라오는 불편한 미각적 경험으로 액상의 양을 확인했지만 
              다이나믹 맥스는 <span>직관적인 용량 표시</span>로 잔량 확인이 가능합니다.
            </p>
          </article>

          <article>
            <ImgTag clsName={styles.icon} src={icon02} alt={'배터리 표시'} />
            <p>
              이전 시리즈인 다이나믹1은 녹색,청색,적색 점등으로 
              배터리를 확인하거나 타 제품엔 배터리 확인 기능이 없는 
              경우도 있지만 다이나믹 맥스는 <span>배터리 잔량을 수치화</span>하여 
              사용자의  제품 경험성을 향상시켰습니다.
            </p>
          </article>
        </div>
  
        
      </section>

    </section>
  )
}

export default Section01
