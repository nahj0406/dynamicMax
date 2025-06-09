import { useState, useEffect, useRef, Suspense, useLayoutEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './Section01.module.css'
import ImgTag from '../../components/ImgTag/ImgTag'
import { Swiper, SwiperSlide } from 'swiper/react';


// img
import Broken_bg from '../../img/Sec1/sec1_broken_bg.png';

// js 라이브러리
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import * as THREE from 'three';
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function Model({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const mixer = useRef();
  const clock = new THREE.Clock();

  useEffect(() => {
    if (!group.current) return;

    scene.scale.set(7, 7, 7);
    scene.position.y = -0.8;
    group.current.add(scene);
    group.current.rotation.y = Math.PI / 4;

    scene.traverse((child) => {
      if (child.isMesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.metalness = 0.3;
        child.material.roughness = 0.05;
      }
    });

    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }

    gsap.to(scene.scale, {
      x: 5,
      y: 5,
      z: 5,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=2000',
        scrub: true,
      },
    });

    gsap.to(scene.position, {
      y: 0,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=2000',
        scrub: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=2000',
        scrub: true,
        markers: true,
      },
    });

    tl.to(group.current.rotation, { y: -Math.PI * 1.9, duration: 2 });
    tl.to(scene.rotation, { x: -Math.PI / 8, duration: 1 });
  }, [scene, animations]);

  useFrame(() => {
    if (mixer.current) mixer.current.update(clock.getDelta());
  });

  return <group ref={group} />;
}


function Section01() {

  const sectionRef = useRef(null);

  useEffect(() => {
     Splitting();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    
      ScrollTrigger.create({
        trigger: sectionRef.current,   // 캔버스를 감싼 div
        start: 'top top',               // 스크롤 시작 지점
        end: `+=2000`,     // 고정 유지 거리
        pin: true,
        // scrub: true, // 필요하면 부드럽게 고정 (주로 애니메이션용)
        markers: true,
      });


    }, sectionRef);
    
    return () => ctx.revert();

  }, []);

  return (
    <section id={styles.Section01}>
      <h2 className={`${styles.title_bg} HemiHead`}>DYNAMIC</h2>

      <section className='containerV1'>
  
        <div className={styles.titleBox}>
          <h3>
              더욱 강력해져 돌아온 <br />
              새로운 <span className='HemiHead'>DYNAMIC</span> 시리즈
          </h3>
          <p>
              업계 10년 경력의 베테랑들이 <br />
              만들어낸 새로운 패러다임을 확인하세요!
          </p>
        </div>
      </section>

      <div className={styles.canvas_wrapper} ref={sectionRef}>
        <Canvas
          shadows
          camera={{ position: [0, 0.1, 1], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          className={styles.canvas}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            intensity={1.5}
            position={[0, 1, 5]}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={50}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />
          <directionalLight intensity={0.6} position={[-5, 1, 0]} />
          <directionalLight intensity={0.6} position={[5, 1, 0]} />
          <hemisphereLight intensity={0.5} groundColor={0x444444} position={[0, 10, 0]} />
          <Environment preset="city" background={false} />
          <Suspense fallback={null}>
            <Model url="/3d/dynamic_3d.glb" />
          </Suspense>
          <OrbitControls />
        </Canvas>
        <div className={styles.Broken_bg}></div>
      </div>

    </section>
  )
}

export default Section01
