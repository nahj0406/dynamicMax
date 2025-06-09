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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import * as THREE from 'three';
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Section01() {

  useEffect(() => {
     Splitting();
  }, []);

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

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

// three 3d
useLayoutEffect(() => {
  const canvas = canvasRef.current;
  const scene = new THREE.Scene();
  let isReadyToRender = false;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  renderer.clear();

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 0.1, 1);
  scene.background = null;

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
  mainLight.position.set(0, 2, 5);
  mainLight.target.position.set(0, 0, 0);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.set(2048, 2048);
  mainLight.shadow.camera.near = 0.1;
  mainLight.shadow.camera.far = 50;
  mainLight.shadow.camera.left = -5;
  mainLight.shadow.camera.right = 5;
  mainLight.shadow.camera.top = 5;
  mainLight.shadow.camera.bottom = -5;
  scene.add(mainLight);
  scene.add(mainLight.target);

  const sideLightL = new THREE.DirectionalLight(0xffffff, 0.6);
  sideLightL.position.set(-5, 1, 0);
  scene.add(sideLightL);

  const sideLightR = new THREE.DirectionalLight(0xffffff, 0.6);
  sideLightR.position.set(5, 1, 0);
  scene.add(sideLightR);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  const clock = new THREE.Clock();
  let mixer = null;
  const root = new THREE.Group();

  loader.load('/3d/dynamic_3d.glb', (gltf) => {
    gltf.scene.scale.set(9, 9, 9);
    gltf.scene.position.y = -0.45;
    root.add(gltf.scene);
    root.rotation.y = Math.PI / 4;
    scene.add(root);

    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.castShadow = true;
          child.receiveShadow = true;

          child.material.metalness = 1.0;
          child.material.roughness = 0.05;
        }
      }
    });

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }

    gsap.to(gltf.scene.scale, {
      x: 5,
      y: 5,
      z: 5,
      scrollTrigger: {
        trigger: canvasRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: true,
      },
    });

    gsap.to(gltf.scene.position, {
      y: 0,
      scrollTrigger: {
        trigger: canvasRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: canvasRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: true,
        markers: true,
      },
    });

    tl.to(root.rotation, { y: -Math.PI * 1.9, duration: 2 });
    tl.to(gltf.scene.rotation, { x: -Math.PI / 8, duration: 1 });

    // ✅ 모든 준비가 끝난 후에 환경맵 설정 및 렌더 시작
    const envMap = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    requestAnimationFrame(() => {
      scene.environment = envMap;
      renderer.compile(scene, camera);
      isReadyToRender = true;
      animate();
    });
  });

  const handleResize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  window.addEventListener('resize', handleResize);
  handleResize();

  function animate() {
    requestAnimationFrame(animate);
    if (!isReadyToRender || !scene || !camera) return;
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    try {
      renderer.render(scene, camera); // ✅ try-catch로 WebGL 상태 감지
    } catch (e) {
      console.error('Renderer error:', e);
    }
  }

  return () => {
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
    pmremGenerator.dispose();
    scene.clear();
    dracoLoader.dispose();
  };
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
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
        <div className={styles.Broken_bg}></div>
      </div>

    </section>
  )
}

export default Section01
