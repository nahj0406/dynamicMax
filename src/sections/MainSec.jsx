import { useState, useEffect, useRef, Suspense } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import mainsecBg from '../img/MainSec/main_sec_bg.png';
import styles from './MainSec.module.css'

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function MainSec() {

  useEffect(() => {
     Splitting();
  }, []);

  return (
    <section id={styles.main_Section}>
      111111111111111111111111111111
    </section>
  )
}

export default MainSec
