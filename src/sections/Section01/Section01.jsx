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

    // renderer.setClearColor(0x201E1F); // 캔버스 배경색 지정
    renderer.setClearColor(0x000000, 0); // 캔버스 배경색 지정
    renderer.clear();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader(); // 선택 사항 (최적화)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.1, 1); // 카메라 위치 조작 숫자 커질수록 멀어짐

    // scene.background = new THREE.Color('#201E1F');
    scene.background = null;

    renderer.render(scene, camera);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(0, 2, 5);
    mainLight.target.position.set(0, 0, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
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

    loader.load('/3d/dynamic_3d.glb', function (gltf) {
      gltf.scene.scale.set(9, 9, 9);
      gltf.scene.position.y = -0.45;

      root.add(gltf.scene);
      root.rotation.y = Math.PI / 4;
      scene.add(root);

      // ✅ 먼저 scene에 추가하고
      renderer.render(scene, camera);

      // ✅ 한 프레임 더 미룬 뒤 traverse 실행
      requestAnimationFrame(() => {
        isReadyToRender = true;
        gltf.scene.traverse((child) => {
          if (child.isMesh && child.material) {
            child.castShadow = true;
            child.receiveShadow = true;

            // 💡 금속 재질 적용
            child.material.metalness = 1.0;
            child.material.roughness = 0.05;
            // child.material.needsUpdate = true; // 꼭 필요한 경우만
          }
        });

        // ✅ 애니메이션 및 gsap도 여기서 처리
        gsap.to(gltf.scene.scale, {
          x: 5,
          y: 5,
          z: 5,
          scrollTrigger: {
            trigger: canvasRef.current,
            start: 'top top',
            end: `+=2000`,
            scrub: true,
          }
        });

        gsap.to(gltf.scene.position, {
          y: 0,
          scrollTrigger: {
            trigger: canvasRef.current,
            start: 'top top',
            end: `+=2000`,
            scrub: true,
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: canvasRef.current,
            start: 'top top',
            end: `+=2000`,
            scrub: true,
            markers: true,
          }
        });

        tl.to(root.rotation, {
          y: -Math.PI * 1.9,
          duration: 2,
        });

        tl.to(gltf.scene.rotation, {
          x: -Math.PI / 8,
          duration: 1,
        });
      });

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }

      animate();
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

      if (!isReadyToRender) return;

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);
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
