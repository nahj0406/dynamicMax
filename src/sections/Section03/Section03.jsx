import { useState, useEffect, useRef, Suspense } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './Section03.module.css'
import ImgTag from '../../components/ImgTag/ImgTag'
import { Swiper, SwiperSlide } from 'swiper/react';


// img
import Product01 from '../../img/Sec3/sec3_product01.png';
import Product02 from '../../img/Sec3/sec3_product02.png';
import Product03 from '../../img/Sec3/sec3_product03.png';

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Section03() {

  useEffect(() => {
     Splitting();
  }, []);

  return (
    <section id={styles.Section03}>

      <video autoPlay muted loop playsInline preload="auto" id={styles.bgVideo}>
        <source src={'/video/sec3_video.mp4'} type="video/mp4" />
      </video>

      <section className='containerV1'>

        <div className={`${styles.titleBox} titleBox`}>
          <p>다이나믹만이 가진 <span>특별함</span></p>
          <h2 className='HemiHead'>SPECIALITY</h2>
        </div>

        <figure className={styles.product}>
          <ImgTag clsName={styles.img3} src={Product03} alt={'다이나믹 맥스 모델3'} />
          <ImgTag clsName={styles.img1} src={Product01} alt={'다이나믹 맥스 모델1'} />
          <ImgTag clsName={styles.img2} src={Product02} alt={'다이나믹 맥스 모델2'} />
        </figure>
  
      </section>

    </section>
  )
}

export default Section03
