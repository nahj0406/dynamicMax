import { useState, useEffect, useRef, Suspense } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import styles from './Section01.module.css'
import ImgTag from '../../componunts/ImgTag/ImgTag'
import { Swiper, SwiperSlide } from 'swiper/react';


// img
import Product01 from '../../img/Sec1/sec1_product01.png';
import Product02 from '../../img/Sec1/sec1_product02.png';
import Product03 from '../../img/Sec1/sec1_product03.png';
import Product04 from '../../img/Sec1/sec1_product04.png';
import slide01 from '../../img/Sec1/sec1_slide01.png';
import slide02 from '../../img/Sec1/sec1_slide02.png';
import slide03 from '../../img/Sec1/sec1_slide03.png';
import slide04 from '../../img/Sec1/sec1_slide04.png';
import slide05 from '../../img/Sec1/sec1_slide05.png';

import icon01 from '../../img/Sec1/sec1_icon01.png';
import icon02 from '../../img/Sec1/sec1_icon02.png';
import icon03 from '../../img/Sec1/sec1_icon03.png';
import icon04 from '../../img/Sec1/sec1_icon04.png';

import sec1_bg from '../../img/Sec1/sec1_bg.jpg';
// import canvasGlb from '../../img/Sec1/dynamic_3d.glb';

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

  const slideData = [
    {
      img: slide01,
      alt: '이미지1',
      title: 'METALLIC',
      text: '메탈릭 재질을 활용한 한층 더 고급스러운 외형',
    },

    {
      img: slide02,
      alt: '이미지2',
      title: 'DUAL MESH COIL',
      text: `듀얼 메쉬 코일 적용으로 더 진하고 풍부한 맛표현`,
    },

    {
      img: slide03,
      alt: '이미지3',
      title: 'COMPACT SIZE',
      text: '가벼운 무게와 컴팩트한 사이즈에서 오는 심플함',
    },

    {
      img: slide04,
      alt: '이미지4',
      title: 'AMPLE CAPACITY',
      text: '하루종일 베이핑 해도 걱정없는 10ml 넉넉한 용량',
    },

    {
      img: slide05,
      alt: '이미지5',
      title: 'VERSATILITY PORT',
      text: '범용성 높은 C-type 충전 포트와 직관적인 배터리 잔량 표시',
    }

  ]

  // three 3d
  useEffect(() => {
  const canvas = document.querySelector('#canvas');

  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(0x201E1F); // 캔버스 배경색 지정
  renderer.clear();

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader(); // 선택 사항 (최적화)
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 1);

  scene.background = new THREE.Color('#201E1F');

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
    gltf.scene.scale.set(5, 5, 5);
    gltf.scene.position.y = -0.2;
    root.add(gltf.scene);
    scene.add(root);

    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        // 💡 금속 재질 느낌 적용
        child.material.metalness = 1.0;     // 금속성 100%
        child.material.roughness = 0.05;    // 거의 반짝임 있는 표면
        child.material.needsUpdate = true;  // 업데이트 적용
      }
    });

    gsap.to(root.rotation, {
      x: Math.PI * 2 * 2,
      y: Math.PI * 2 * 5,
      scrollTrigger: {
        trigger: canvas,
        start: '-=500',
        end: '+=500',
        scrub: true,
        markers: true,
      },
      // ease: 'none',
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
      <div className={styles.bg_img}></div>

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

        <canvas id='canvas' style={{backgroundColor: '#201E1F'}}></canvas>
        {/* width={418} height={1047} */}
  
        <figure className={styles.productBox}>
          <ImgTag clsName={styles.item2} src={Product02} alt={'다이나믹 맥스 제품 이미지2'} />
          <ImgTag clsName={styles.item1} src={Product01} alt={'다이나믹 맥스 제품 이미지1'} />
          <ImgTag clsName={styles.item3} src={Product03} alt={'다이나믹 맥스 제품 이미지3'} />
        </figure>
      </section>

      <section className={styles.slideContainer}>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          // centeredSlides={true}
          className="sec01_swiper"
        >
          {
            slideData.map((item, index) => {
              return(
                <SwiperSlide key={index}>
                  <figure className={styles.img}>
                    <ImgTag src={item.img} alt={item.alt} />
                  </figure>

                  <div className={styles.textBox}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>

      <section className={styles.Specs}>
        <section className='containerV1'>
          <h3>제품 제원</h3>
  
          <div className={styles.itemBox}>
            <article className={styles.size}>
              <ImgTag src={Product04} alt={'다이나믹 맥스 사이즈'} />
  
              <div className={styles.textBox}>
                <h5>사이즈</h5>
                <p>48x15x113mm</p>
              </div>
            </article>
  
            <div className={styles.specs_unit}>
              <article className={styles.Capacity}>
                <ImgTag src={icon04} alt={'다이나믹 맥스 저장용량'} />
    
                <div className={styles.textBox}>
                  <h5>액상 저장용량</h5>
                  <p>10ml</p>
                </div>
              </article>
    
              <article className={styles.weight}>
                <ImgTag src={icon03} alt={'다이나믹 맥스 무게'} />
    
                <div className={styles.textBox}>
                  <h5>무게</h5>
                  <p>60g</p>
                </div>
              </article>
    
              <article className={styles.Coil}>
                <ImgTag src={icon02} alt={'다이나믹 맥스 코일사양'} />
    
                <div className={styles.textBox}>
                  <h5>코일사양</h5>
                  <p>Dual Mesh <br/> Coil</p>
                </div>
              </article>
    
              <article className={styles.battery}>
                <ImgTag src={icon01} alt={'다이나믹 맥스 배터리'} />
    
                <div className={styles.textBox}>
                  <h5>배터리</h5>
                  <p>550mAh</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        </section>
    </section>
  )
}

export default Section01
