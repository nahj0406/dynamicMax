import { useEffect, useRef, Suspense, useLayoutEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
// import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './Section01.module.css'
import ImgTag from '../../components/ImgTag/ImgTag'
import useScrollOut from '../../customHook/useScrollOut'


// js 라이브러리
// import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
// useThree
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import * as THREE from 'three';
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);




function Section01() {

  const sec01Ref = useRef(null);
  const sectionRef = useRef(null);
  const titleBgRef = useRef(null);
  const BrokenRef = useRef(null);
  const titleBoxRef = useRef(null);
  const viewportHeight = window.innerHeight;

  useEffect(() => {
    Splitting();
  })

  useScrollOut({
    targetClass: styles.scAni,
    animateCalss: styles.animate,
  });

  useLayoutEffect(() => { // gsap 하단 model 안에는 model 조작용 gsap 코드 들어 있음.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,   // 캔버스를 감싼 div
          start: 'top+=15% 20%',   // 스크롤 시작 지점
          end: `+=${(viewportHeight * 1.4)}`,     // 고정 유지 거리
          pin: true,
        });

        gsap.to(titleBgRef.current, {
          y: -400,
          scrollTrigger: {
            trigger: sec01Ref.current,
            start: 'top+=10% 30%',
            end: `+=${(viewportHeight * 1.4)}`,
            scrub: 2,
            // markers: true,
          },
        });


      }, sectionRef);

      return () => ctx.revert(); // ✅ 미디어 해제 시 정리
    });
    return () => mm.revert(); 

  }, []);

  return (
    <section id={styles.Section01} ref={sec01Ref}>
      <h2 className={`${styles.title_bg} HemiHead`} ref={titleBgRef}>DYNAMIC</h2>

      <section className={`${styles.title_container} containerV1`}>
  
        <div className={`${styles.titleBox} ${styles.scAni}`}>
          <h3 data-splitting>더욱 강력해져 돌아온</h3>
          <h3 className={styles.tagSecd}><span>새로운</span> <span className={`${styles.colorSpan} HemiHead`}>DYNAMIC</span> <span>시리즈</span></h3>
        </div>
      </section>

      <div className={`${styles.canvas_wrapper} ${styles.scAni}`} ref={sectionRef}>
        <div className={`${styles.Broken_bg}`} ref={BrokenRef}></div>
        <div className={styles.mob_touch_clear}></div>

        <Canvas
          shadows
          camera={{ position: [0, 0.1, 1], fov: 60 }}
          gl={{ antialias: true, alpha: true, }}
          // toneMappingExposure: 5 
          className={styles.canvas}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            intensity={0.5} // 밝기 조절
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
          <Environment preset="city" background={false} /> {/* 비취지는 배경 city는 도시 */}
          <Suspense fallback={null}>
            <Model viewportHeight={viewportHeight} sectionRef={sectionRef} BrokenRef={BrokenRef} titleBoxRef={titleBoxRef} url="/3d/dynamic_3d.glb" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>

        <div className={`${styles.titleBox} ${styles.scAni}`} ref={titleBoxRef}>
          <h3 className='Gmarket'>
            업계 10년 경력의 베테랑들이 <br />
            만들어낸 새로운 <span className={`${styles.colorSpan} Gmarket`}>패러다임</span>을 확인하세요!
          </h3>
        </div>
      </div>

    </section>
  )
}



// 3d 모델링 설정
function Model({ url, sectionRef, BrokenRef, titleBoxRef, viewportHeight }) {

  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const mixer = useRef();
  const clock = new THREE.Clock();
  

  useLayoutEffect(() => {
    if (!group.current) return;

    group.current.add(scene);

    scene.traverse((child) => {
      if (child.isMesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.metalness = 0.5;
        child.material.roughness = 0.4;
      }
    });

    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }

    const mm = gsap.matchMedia();

    requestAnimationFrame(() => {

      mm.add("(min-width: 769px)", () => {
        const ctx = gsap.context(() => {
          scene.scale.set(7, 7, 7);
          scene.position.y = -0.3;
          group.current.rotation.y = Math.PI / 6;

          // gsap
          gsap.set(BrokenRef.current, { opacity: 0, scale: 0.9 });
          gsap.set(titleBoxRef.current, { opacity: 0, y: 50 });

          gsap.to(scene.scale, {
            x: 6,
            y: 6,
            z: 6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top+=15% 20%',
              end: `+=${(viewportHeight * 1.4)}`,
              scrub: true,
            },
          });

          gsap.to(scene.position, {
            y: -0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top+=15% 20%',
              end: `+=${(viewportHeight * 1.4)}`,
              scrub: true,
            },
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top+=15% 20%',
              end: `+=${(viewportHeight * 1.4)}`,
              scrub: true,
            },
          });

          tl.to(group.current.rotation, { y: -Math.PI * 1.9, duration: 2 });
          tl.to(scene.rotation, { x: -Math.PI / 8, duration: 1 });
          tl.to(BrokenRef.current, { opacity: 1, scale: 0.98});
          tl.to(titleBoxRef.current, { opacity: 1, y: 0});
        }, sectionRef);

        return () => ctx.revert();
      });

      mm.add("(max-width: 768px)", () => { // ✅ 모바일 설정
        const ctx = gsap.context(() => {

          scene.scale.set(7, 7, 7);
          scene.position.y = -0.3;
          group.current.rotation.y = Math.PI / 4;

          gsap.to(group.current.rotation, {
            y: '+=6.28319', // 2 * Math.PI (360도 회전)
            duration: 7,     // 5초에 한 바퀴
            repeat: -1,      // 무한 반복
            ease: 'none',     // 일정한 속도
          });

        }, sectionRef);

        return () => ctx.revert();
      });
      
      return () => mm.revert(); 
    });
  }, [scene, animations]);

  useFrame(() => {
    if (mixer.current) mixer.current.update(clock.getDelta());
  });

  return <group ref={group} />;
}

export default Section01
