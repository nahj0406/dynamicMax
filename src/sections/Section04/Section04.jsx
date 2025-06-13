import {useEffect} from 'react'
import styles from './Section04.module.css'
import ImgTag from '@/components/ImgTag/ImgTag'
import useScrollOut from '@/customHook/useScrollOut'


// img
import starwBg from '@/img/Sec4/sec4_straw_bg.png';
import mangoBg from '@/img/Sec4/sec4_mango_bg.png';
import aloeBg from '@/img/Sec4/sec4_aloe_bg.png';
import blueberryBg from '@/img/Sec4/sec4_blueberry_bg.png';
import melonBg from '@/img/Sec4/sec4_melon_bg.png';
import mentholBg from '@/img/Sec4/sec4_menthol_bg.png';
import oakBg from '@/img/Sec4/sec4_oak_bg.png';
import orangeBg from '@/img/Sec4/sec4_orange_bg.png';
import plumcotBg from '@/img/Sec4/sec4_plumcot_bg.png';

import starw from '@/img/Sec4/sec4_slide_straw.png';
import mango from '@/img/Sec4/sec4_slide_mango.png';
import aloe from '@/img/Sec4/sec4_slide_aloe.png';
import blueberry from '@/img/Sec4/sec4_slide_blueberry.png';
import melon from '@/img/Sec4/sec4_slide_melon.png';
import menthol from '@/img/Sec4/sec4_slide_menthol.png';
import oak from '@/img/Sec4/sec4_slide_oak.png';
import orange from '@/img/Sec4/sec4_slide_orange.png';
import plumcot from '@/img/Sec4/sec4_slide_plumcot.png';

// js 라이브러리
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function Section04({slideActive}) {

  useEffect(() => {
    Splitting();
  }, []);

  useScrollOut({
    targetClass: styles.scAni,
    animateCalss: styles.animate,
  });


  const slideData = [

    {
      product: mango,
      bg: mangoBg,
      title1: 'PASSION MANGO',
      title2: '패션 망고',
      color : '#FFBB00',
      gradient: 'linear-gradient(rgba(255, 157, 0, 0.19) 45%, #FF9C00 80%)',
    },


    {
      product: starw,
      bg: starwBg,
      title1: 'STRAWBERRY KIWI',
      title2: '딸기 키위',
      color : '#FF3F28',
      gradient: 'linear-gradient(rgba(141, 145, 35, 0.19) 45%, #FB5440 80%)',
    },

    {
      product: melon,
      bg: melonBg,
      title1: 'MEELON PEACH',
      title2: '멜론 피치',
      color : '#6DC951',
      gradient: 'linear-gradient(rgba(235, 168, 168, 0.19) 45%, #B0C951 80%)',
    },

    {
      product: blueberry,
      bg: blueberryBg,
      title1: 'BLUEBERRY BURST',
      title2: '블루베리 버스트',
      color : '#152E56',
      gradient: 'linear-gradient(rgba(51, 92, 157, 0.19) 45%, #335C9D 80%)',
    },

    {
      product: menthol,
      bg: mentholBg,
      title1: 'POWER MENTHOL',
      title2: '파워 멘솔',
      color : '#3CA17F',
      gradient: 'linear-gradient(rgba(112, 229, 190, 0.19) 45%, #70E5BE 80%)',
    },

    {
      product: aloe,
      bg: aloeBg,
      title1: 'MEGA ALOE',
      title2: '메가 알로에',
      color : '#64AA27',
      gradient: 'linear-gradient(rgba(29, 139, 84, 0.19) 45%, #1D8B54 80%)',
    },

    {
      product: plumcot,
      bg: plumcotBg,
      title1: 'PLUMCOT TWIST',
      title2: '플럼코트 트위스트',
      color : '#AA2B62',
      gradient: 'linear-gradient(rgba(222, 31, 82, 0.19) 45%, #DE1F52 80%)',
    },

    {
      product: orange,
      bg: orangeBg,
      title1: 'ORANGE SODA LIME',
      title2: '오렌지소다 라임',
      color : '#FF5900',
      gradient: 'linear-gradient(rgba(215, 225, 103, 0.19) 45%, #FF7500 80%)',
    },

    {
      product: oak,
      bg: oakBg,
      title1: 'CREAM OAK',
      title2: '크림 오크',
      color : '#8F5626',
      gradient: 'linear-gradient(rgba(101, 88, 83, 0.19) 45%, #433B38 80%)',
    },

  ]

  const SwiperOptions = {
    slidesPerView: 1.6,
    spaceBetween: 15,
    centeredSlides: true,
    speed: 500,
    loop: true,
    modules: [Autoplay],
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 2.2,
        spaceBetween: 15,
      },
      560: {
        slidesPerView: 2.4,
        spaceBetween: 15,
      },
      680: {
        slidesPerView: 2.6,
        spaceBetween: 15,
      },
      769: {
        slidesPerView: 3.8,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 4.2,
      },
      1400: {
        slidesPerView: 4.8,
        spaceBetween: 20,
      },
      1921: {
        slidesPerView: 5.8,
        spaceBetween: 20,
      },
    },
  }

  return (
    <section id={styles.Section04} className={`${slideActive ? styles.slideActive : ''}`}>

      <div className={styles.bg_bar}></div>

      <section className='containerV1'>
        <div className={`${styles.titleBox} ${styles.scAni} titleBox`}>
          <p>11가지 종류의 다양한 맛</p>
          <h2 data-splitting className='HemiHead'>MODELS</h2>
        </div>
      </section>

      <section className={styles.slideContainer}>
        <Swiper {...SwiperOptions} className={styles.sec04_swiper} >
          {
            slideData.map((item, index) => {
              return(
                <SwiperSlide key={index}>
                  <div className={styles.slide_unit} style={{'--slideBg' : `url(${item.bg})`}}>

                    <div className={styles.bg_layer} style={{backgroundImage: `${item.gradient}`}}></div>

                    <div className={styles.textLine} style={{backgroundColor: `${item.color}`}}>
                      <span className='HemiHead'>
                        {item.title1} {item.title1} {item.title1} {item.title1} {item.title1} {item.title1}
                        {item.title1} {item.title1} {item.title1} {item.title1} {item.title1} {item.title1}
                      </span>
                    </div>

                    <figure className={styles.img}>
                      <ImgTag src={item.product} alt={item.title2} />
                    </figure>
  
                    <div className={styles.textBox}>
                      <h5 className='HemiHead'>{item.title1}</h5>
                      <h4>{item.title2}</h4>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>

      <div className={styles.buttonBox}>
        <a href="https://www.worldvape.co.kr/" target={'_blank'} rel="noopener noreferrer">제품 구매하기</a>
      </div>

    </section>
  )
}

export default Section04
