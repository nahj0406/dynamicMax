import React, {useState, useEffect, useRef } from 'react'
import '@/css/App.css'


// cdn으로 부른거 전부 import 해야 하는지
// swiper는 바닐라로 하면 dom 접근을 하는데 리액트 swiper로 해야 하는지
// 이미지 파일 경로도 전부 src로 넣어서 접근해야 하는지

function Dynamic01() {  


  return (
    <div id='Dynamic01'>
      <div className="dynamic1 view swiper on">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <section className="section1">
              <div className="conMain-ellipseBox"></div>
              <div className="conMain-text beMore">
                <p>BE MORE</p>
              </div>
              <div className="conMain-products">
                <img src="src/product-01.png" alt="다이나믹 메인 제품 이미지" />
              </div>
              <div className="conMain-text dynamic">
                <p>DYNAMIC</p>
              </div>
              <div className="conMain-scrollDown">
                <p>SCROLL DOWN</p>
                <img src="src/scrollDownArrow.png" alt="스크롤 다운" />
              </div>
              <div className="conMain-scrollDownCircle">
                <img className="circle" src="src/scrollDownCircle.png" alt="스크롤 다운" />
                <img className="arrow" src="src/arrowDown.png" alt="아래 화살표" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dynamic01
