import { useState, useEffect, useRef, Suspense } from 'react'
import './css/App.css'
import './css/style.css'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';

// 커스텀 컴포넌트
import SplitMotion from './Flamer_Element/SplitMotion';
import InViewMotion from './Flamer_Element/InViewMotion';
import Header from './componunts/Header/Header';

// img
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// js 라이브러리
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import MainSec from './sections/MainSec'



function App() {

  useEffect(() => {
     Splitting();
  }, []);

  return (
    <div id='App'>
      {/* <Suspense fallback={<Fallback />}></Suspense> */}
      {/* <Routes>
        <Route path='/' element={<MainSec />} />
      </Routes> */}

      {/* 헤더 */}
      <Header/>

      {/* 메인 베너 */}
      <MainSec />
    </div>
  )
}

export default App
