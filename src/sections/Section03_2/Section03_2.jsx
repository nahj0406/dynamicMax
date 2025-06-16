import { useState, useEffect} from 'react'
import styles from './Section03_2.module.css'
import ImgTag from '@/components/ImgTag/ImgTag'
import { useSelector } from 'react-redux';
import useIsMobile from '@/customHook/useIsMobile'

import "swiper/css";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Splitting from 'splitting';

function Section03_2({slideActive}) {

  const sec3Data = useSelector((state) => state.sec3Data);
  const [slideActiveIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    Splitting();
  })

  const SwiperOptions = {
    slidesPerView: 1.6,
    spaceBetween: 25,
    centeredSlides: true,
    speed: 500,
    loop: false,
    modules: [Autoplay],
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 2.2,
      },
      560: {
        slidesPerView: 2.4,
      },
      680: {
        slidesPerView: 2.6,
      },
      768: {
        slidesPerView: 3.8,
      },
    },
  }



  return (
    <section id={styles.Section03_2} className={`${slideActive ? styles.slideActive : ''}`}>
      <video autoPlay muted loop playsInline preload="auto" id={styles.bgVideo}>
        <source src={'/video/dynamicMax/sec3_video.mp4'} type="video/mp4" />
      </video>

      <section className='containerV1'>

        <div className={`${styles.titleBox} ${styles.scAni} titleBox`}>
          <p>다이나믹만의 <span>차별화</span></p>
          <h2 data-splitting className='HemiHead'>COMPETITIVE</h2>
        </div>
      </section>

      <section className={styles.slideContainer}>
        <Swiper 
          {...SwiperOptions} className={styles.sec03_2_swiper} 
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {
            sec3Data.map((item, i) => {
              return(
                <SwiperSlide key={i} className={`${styles.item_slide} ${slideActiveIndex === i ? styles.item_active : ''}`}>
                  <figure className={styles.item}>
                    <ImgTag clsName={styles.img} src={item.url} alt={item.name} />
  
                    <div className={styles.textBox}>
                      <h5>{item.name}</h5>
                      <figcaption>{item.text}</figcaption>
                    </div>
                  </figure>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>
    </section>
  )
}

export default Section03_2
