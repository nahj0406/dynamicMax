import React, {useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import {Dynamic01Script} from '@/js/dynamic1/script.js';
import '@/css/dynamic1/dynamic1.css';


// sec1
import product01 from '@/img/dynamic1/product-01.png'
import scrollDownArrow from '@/img/dynamic1/scrollDownArrow.png'
import scrollDownCircle from '@/img/dynamic1/scrollDownCircle.png'
import arrowDown from '@/img/dynamic1/arrowDown.png'

// sec2
import vape2_3 from '/video/dynamic1/vape2-3.mp4'
import vape2_3_mobile from '@/img/dynamic1/vape2-3-mobile.gif'
import product02 from '@/img/dynamic1/product-02.png'

// sec3
import product_detail_bottom from '@/img/dynamic1/product-detail-bottom.png'
import batterRed from '@/img/dynamic1/batterRed.png'
import batteryBlue from '@/img/dynamic1/batteryBlue.png'
import batteryGreen from '@/img/dynamic1/batteryGreen.png'

// sec4
import text_best_quality from '@/img/dynamic1/text-best-quality.png'
import text_conQuality_orange_1 from '@/img/dynamic1/text-conQuality-orange-1.png'
import text_conQuality_orange_2 from '@/img/dynamic1/text-conQuality-orange-2.png'

// sec5
import mesh_coil from '@/img/dynamic1/mesh-coil.png'
import text_dual_mesh_coil from '@/img/dynamic1/text-dual-mesh-coil.png'
import text_conQuality_purple_1 from '@/img/dynamic1/text-conQuality-purple-1.png'
import text_conQuality_purple_2 from '@/img/dynamic1/text-conQuality-purple-2.png'

// sec6
import img_world from '@/img/dynamic1/img-world.png'
import cross from '@/img/dynamic1/cross.png'
import text_songni from '@/img/dynamic1/text-songni.png'
import text_max1 from '@/img/dynamic1/text-max1.png'
import text_max2 from '@/img/dynamic1/text-max2.png'

// sec7
import text_experts from '@/img/dynamic1/text-experts.png'
import bg_gradient from '@/img/dynamic1/bg-gradient.png'

// sec8
import img_flavor_appleRush from '@/img/dynamic1/img-flavor-appleRush.png'
import img_flavor_berryStraw from '@/img/dynamic1/img-flavor-berryStraw.png'
import img_flavor_calime from '@/img/dynamic1/img-flavor-calime.png'
import img_flavor_cherryCrumble from '@/img/dynamic1/img-flavor-cherryCrumble.png'
import img_flavor_floridaCigar from '@/img/dynamic1/img-flavor-floridaCigar.png'
import img_flavor_grapeBear from '@/img/dynamic1/img-flavor-grapeBear.png'
import img_flavor_mentholBomb from '@/img/dynamic1/img-flavor-mentholBomb.png'
import img_flavor_peachWave from '@/img/dynamic1/img-flavor-peachWave.png'
import img_flavor_snowSoda from '@/img/dynamic1/img-flavor-snowSoda.png'
import img_flavor_summerPocari from '@/img/dynamic1/img-flavor-summerPocari.png'

// sec9
import world_international_logo from '@/img/dynamic1/world-international-logo.png'
import icon_phone from '@/img/dynamic1/icon-phone.png'
import topBtn from '@/img/dynamic1/topBtn.png'


function Dynamic01( {onSlideChange, onLastSlideChange} ) {
  const swiperRef = useRef();
  const location = useLocation();

  useEffect(() => {
    let cleanup;

    requestAnimationFrame(() => {
      cleanup = Dynamic01Script();
    });

    return () => { // 언마운트시 클린업 처리해서 다른 route해선 만일을 대비해 실행 안되어 있게 처리.
      if (typeof cleanup === 'function') {
        cleanup(); // 언마운트 시 cleanup 호출
      }
    };
  }, []);

  useEffect(() => { // 슬라이드 이동할때마다 onslidechange 값 header 보내는 코드
    const handler = (e) => {
      const {direction, isLast} = e.detail;
      onSlideChange(direction); // ✅ 부모로 전달
      onLastSlideChange?.(isLast);
    };
    window.addEventListener('slideDirectionChange', handler);
    return () => window.removeEventListener('slideDirectionChange', handler);

  }, [onSlideChange, onLastSlideChange]);

  return (
    <div id='Dynamic01'>
      <div className="dynamic1 view swiper on" ref={swiperRef}>
        <div className="swiper-wrapper">

          <div className="swiper-slide">
            <section className="section1">
              <div className="conMain-ellipseBox"></div>
              <div className="conMain-text beMore">
                <p>BE MORE</p>
              </div>
              <div className="conMain-products">
                <img src={product01} alt="다이나믹 메인 제품 이미지" />
              </div>
              <div className="conMain-text dynamic">
                <p>DYNAMIC</p>
              </div>
              <div className="conMain-scrollDown">
                <p>SCROLL DOWN</p>
                <img src={scrollDownArrow} alt="스크롤 다운" />
              </div>
              <div className="conMain-scrollDownCircle">
                <img className="circle" src={scrollDownCircle} alt="스크롤 다운" />
                <img className="arrow" src={arrowDown} alt="아래 화살표" />
              </div>
            </section>
          </div>

          <div className="swiper-slide">
            <section className="section2">
              <h2 className="heading">컴팩트한 사이즈와 10ML 대용량 기기 다이나믹</h2>
              <video className="conQuality-bg-vape" autoPlay loop muted>
                <source src={vape2_3} type="video/mp4"/>
              </video>
              <div className="conQuality-bg-vape-mobile">
                <img src={vape2_3_mobile} alt="연기 이미지"/>
              </div>
              <div className="conMain-centerBox">
                <div className="conMain-products2">
                  <img src={product02} alt="다이나믹 메인 제품 이미지2"/>
                </div>
                <div className="conMain-text2">
                  <h3 className="title">컴팩트한 사이즈로 손 안에 쏙 들어오는 안정적인 그립감</h3>
                </div>
                <div className="conMain-text3">
                  <p className="count">
                    {/* <!-- <b id="count">0</b>  --> */}
                    {/* <!-- <span>PUFFS</span> --> */}
                  </p>
                  <h3 className="title"><b>10ML</b> 대용량으로 하루종일 베이핑해도 걱정없이</h3>
                </div>
                <div className="conMain-text4">
                  <p className="detail">Container Capacity<span>10 mL</span></p>
                  <p className="detail">Nicotine Strength<span>9.8 mg/mL</span></p>
                  {/* <!-- <p className="detail">Puffs<span>Up to 10000</span></p> --> */}
                </div>
              </div>
            </section>
          </div>

          <div className="swiper-slide">
            <section className="section3">
              <h2 className="heading">C 타입(C-type) 충전방식 지원</h2>
              <video className="conQuality-bg-vape index1" autoPlay loop muted>
                <source src={vape2_3} type="video/mp4"/>
              </video>
              <div className="conQuality-bg-vape-mobile index1">
                <img src={vape2_3_mobile} alt="연기 이미지"/>
              </div>
              <div className="conMain-centerBox2">
                <div className="conMain-products3">
                  <img className="bottom" src={product_detail_bottom} alt="다이나믹 메인 제품 하단 이미지"/>
                  <img className="light" src={batteryGreen} alt="배터리 완충 색상 연두색"/>
                </div>
                <div className="conMain-text4-2">
                  <p className="detail">Container Capacity<span>10 mL</span></p>
                  <p className="detail">Nicotine Strength<span>9.8 mg/mL</span></p>
                  {/* <!-- <p className="detail">Puffs<span>Up to 10000</span></p> --> */}
                </div>
                <div className="conMain-text5">
                  <h3 className="title">C-type 충전방식</h3>
                  <p className="detail">Battery Capacity<span>550 mAh</span></p>
                </div>
                <div className="conMain-text6">
                  <h3 className="title">배터리 표시</h3>
                  <ul className="batteryDetailBox">
                    <li className="detail">
                      <img src={batterRed} alt="배터리 부족"/>
                      배터리 부족
                    </li>
                    <li className="detail">
                      <img src={batteryBlue} alt="중간" />
                      중간
                    </li>
                    <li className="detail">
                      <img src={batteryGreen} alt="완충" />
                      완충
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="swiper-slide">
            <section className="section4">
              <h2 className="heading">국내 유일 자체 생산 합성니코틴 사용</h2>
              <div className="conQuality-bg orange">
                <div className="conQuality-wrapper">
                  <div className="conQuality-bestQuality">
                    <div className="conQuality-1-text1">
                      <img className="afterimage" src={text_best_quality} alt="BEST QUALITY"/>
                      <img className="forward" src={text_best_quality} alt="BEST QUALITY"/>
                    </div>
                  </div>
                  <div className="conQuality-1-text2">
                    <img className="afterimage" src={text_conQuality_orange_1} alt="국내 유일 자체 생산 합성니코틴 사용"/>
                    <img className="forward" src={text_conQuality_orange_1} alt="국내 유일 자체 생산 합성니코틴 사용"/>
                  </div>
                  <div className="conQuality-1-text3">
                    <img className="afterimage" src={text_conQuality_orange_2} alt="담배특이 니트로사민 불검출"/>
                    <img className="forward" src={text_conQuality_orange_2} alt="담배특이 니트로사민 불검출"/>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="swiper-slide">
            <section className="section5">
              <h2 className="heading">최고 품질의 듀얼메쉬코일과 친환경 펄프솜 사용</h2>
              <div className="conQuality-bg purple">
                <div className="conQuality-text2">
                  <div className="imgBox">
                    <img className="img" src={mesh_coil} alt="듀얼 메쉬 코일"/>
                    <div className="txtBox">
                      <img className="afterimage" src={text_dual_mesh_coil} alt="듀얼 메쉬 코일"/>
                      <img className="forward" src={text_dual_mesh_coil} alt="듀얼 메쉬 코일"/>
                    </div>
                  </div>
                  <div className="conQuality-2-text2">
                    <img className="afterimage" src={text_conQuality_purple_1} alt="최고급 품질의 메쉬 코일과 친환경 펄프 솜을 사용하여"/>
                    <img className="forward" src={text_conQuality_purple_1} alt="최고급 품질의 메쉬 코일과 친환경 펄프 솜을 사용하여"/>
                  </div>
                  <div className="conQuality-2-text3">
                    <h3 className="heading">높은 무화량으로 풍부한 맛 표현 가능</h3>
                    <img className="afterimage" src={text_conQuality_purple_2} alt="높은 무화량으로 인한 풍부한 맛 표현 가능"/>
                    <img className="forward" src={text_conQuality_purple_2} alt="높은 무화량으로 인한 풍부한 맛 표현 가능"/>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="swiper-slide">
            <section className="section6">
              <h2 className="heading">국내 최대 액상 제조사와 세계적인 기기 제조사 Songni 의 협업</h2>
              <div className="conQuality-bg blue">
                <div className="conQuality-centerBox">
                  <div className="conQuality-text3">
                    <p className="detail index0">맛이 없을 수가 없는 액상 맛집 비결<span className="underline"></span></p>
                  </div>
                  <div className="conQuality-text4-1">
                    <img className="world" src={img_world} alt="월드인터네셔널 기업 로고"/>
                    <img className="cross" src={cross} alt="x"/>
                    <img className="songni" src={text_songni} alt="Songni International 기업 로고"/>
                    <div className="maxBox index0">
                      <img className="max1" src={text_max1} alt="국내최대"/>
                      <p>액상 제조사에서 개발한 액상</p>
                    </div>
                    <div className="maxBox index1">
                      <img className="max2" src={text_max2} alt="세계적인"/>
                      <p>기기 제조사에서 제작한 기기</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="swiper-slide">
            <section className="section7">
              <h2 className="heading">많은 액상을 개발해온 전문가들이 모여 실패없는 보장된 맛을 제공</h2>
              <div className="conQuality-experts">
                <div className="imgExpertsWrap">
                  <img className="imgExperts index0" src={text_experts} alt="EXPERTS"/>
                  <img className="imgExperts index1" src={text_experts} alt="EXPERTS"/>
                  <img className="imgGradient" src={bg_gradient} alt="배경 그래디언트"/>
                </div>
                <div className="conQuality-experts-text">
                  <div className="txtBox">
                    <div className="blueCircle"></div>
                    <p className="detail index0">수없이 많은 액상을 개발해온 <b>전문가들</b>이 모여</p>
                  </div>
                  <p className="detail index1">실패없는 <b>보장된 맛</b>을 제공합니다. </p>
                </div>
              </div>
            </section>
          </div>

          <div className="swiper-slide">
            <section className="section8">
              <h2 className="heading">10가지 다양한 맛을 경험해보세요</h2>
              <div className="linkGuide">
                {/* <!-- <img src="src/purchaseBtn.png" alt="제품 이미지를 클릭하면 구매 페이지로 이동합니다"> --> */}
                  <p>
                    <a href="https://dynamicstore.shop/" target="_blank">제품 구매하기</a>
                  </p>
              </div>
              <div className="conFlavor">
                <div className="conFlavor-bg">
                  <div className="conFlavorWrapper">
                    <div className="conFlavor-title">Flavor</div>
                    <div className="conFlavor-description">
                      <div className="list" data-flavor="floridaCigar">
                        <h3>Florida Cigar <span className="titleKo">플로리다시가</span></h3>
                        <p>
                          묵직한 시가 특유의 향과 깊이있는 풍미로
                          텁텁함 없이 깔끔한 베이핑 경험을 느낄 수 있는 맛
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="0"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="0"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="0"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="8"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="8"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="mentholBomb">
                        <h3>Menthol Bomb <span className="titleKo">멘솔밤</span></h3>
                        <p>들숨에 개운한 멘솔향과 날숨에 시원한 쿨링으로
                          강력하고 신선한 맛
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="1"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="0"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="7"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="5"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="calime">
                        <h3>Calime <span className="titleKo">깔라임</span></h3>
                        <p>깔라만시와 라임을 밸런스 있게 조합한
                          새콤하고 향긋한 시트러스의 향
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="8"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="2"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="berryStraw">
                        <h3>Berry Straw <span className="titleKo">베리스트로</span></h3>
                        <p>신선한 딸기의 달콤한 향과 새콤한 맛이 매력적인
                          매일 베이핑하고 싶은 진한 딸기 맛
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="snowSoda">
                        <h3>Snow Soda <span className="titleKo">스노우소다</span></h3>
                        <p>
                          시원한 쿨링과 소다가 자연스럽게 어우러진
                          모두가 떠올리는 소다 맛의 정석
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="7"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="7"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="3"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="5"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="grapeBear">
                        <h3>Grape Bear <span className="titleKo">그레이프 베어</span></h3>
                        <p>
                          달콤하고 기분 좋은 적포도의 풍미를 담아내며
                          누구나 좋아할 호불호 없는 맛
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="7"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="5"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="appleRush">
                        <h3>Apple Rush <span className="titleKo">애플러쉬</span></h3>
                        <p>청사과의 청량하고 상큼한 맛이 
                          쿨링과 함께 더해진 깔끔하고 산뜻한 맛
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="5"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="3"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="peachWave">
                        <h3>Peach Wave <span className="titleKo">피치웨이브</span></h3>
                        <p>백도의 상큼달콤한 향과 과육의 맛을 섬세하게 재현한
                          누구나 즐길 수 있는 데일리 복숭아 맛
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="5"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="3"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="5"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="summerPocari">
                        <h3>Summer Pocari <span className="titleKo">썸머포카리</span></h3>
                        <p>뜨거운 여름에 마시는 이온음료의 청량함이 담긴
                          시원한 쿨링의 상쾌한 맛
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="3"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="3"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="list" data-flavor="cherryCrumble">
                        <h3>Cherry Crumble <span className="titleKo">체리크럼블</span></h3>
                        <p>새콤달콤한 앵두 과육의 맛을 그대로 담아내며
                          중독성을 더한 매력적인 새콤달콤한 맛
                        </p>
                        <ul>
                          <li className="sweetness">
                            <span>달콤함</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="cooling">
                            <span>쿨링감</span>
                            <div className="bar">
                              <div className="value" data-value="6"></div>
                            </div>
                          </li>
                          <li className="sour">
                            <span>상큼함</span>
                            <div className="bar">
                              <div className="value" data-value="2"></div>
                            </div>
                          </li>
                          <li className="neck">
                            <span>목넘김</span>
                            <div className="bar">
                              <div className="value" data-value="3"></div>
                            </div>
                          </li>
                          <li className="weight">
                            <span>무게감</span>
                            <div className="bar">
                              <div className="value" data-value="4"></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="conFlavor-imgs">
                      <div className="flavor swiper">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide" data-flavor="appleRush">
                            <img src={img_flavor_appleRush} alt="Apple Rush 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="berryStraw">
                            <img src={img_flavor_berryStraw} alt="Berry Straw 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="calime">
                            <img src={img_flavor_calime} alt="Calime 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="cherryCrumble">
                            <img src={img_flavor_cherryCrumble} alt="Cherry Crumble 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="floridaCigar">
                            <img src={img_flavor_floridaCigar} alt="Florida Cigar 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="grapeBear">
                            <img src={img_flavor_grapeBear} alt="Grape Bear 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="mentholBomb">
                            <img src={img_flavor_mentholBomb} alt="Menthol Bomb 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="peachWave">
                            <img src={img_flavor_peachWave} alt="Peach Wave 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="snowSoda">
                            <img src={img_flavor_snowSoda} alt="Snow Soda 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                          <div className="swiper-slide" data-flavor="summerPocari">
                            <img src={img_flavor_summerPocari} alt="Summer Pocari 기기 이미지"/>
                            <div className="gradientBox"></div>
                          </div>
                        </div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-pagination"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="swiper-slide">
            <section className="section9">
              <h2 className="heading">월드인터네셔널 기업 소개</h2>
              <div className="conAboutUs">
                <div className="blurCircle index0"></div>
                <div className="blurCircle index1"></div>
                <div className="conAboutUs-descriptionBox">
                  <div className="conAboutUs-title">About Us</div>
                  <img src={world_international_logo} alt="월드인터네셔널 기업 로고"/>
                  <h3 className="introduce">월드인터네셔널은 <b>10년</b> 경력의 전자담배 기업입니다</h3>
                  <p className="promise">10년간의 노하우가 담긴 최상급의 품질을 제공해드리겠습니다</p>
                  <div className="phone">
                    <img src={icon_phone} alt="전화번호 010-0000-0000"/>
                    <p>+82 &ensp; 010-2349-8677</p>
                  </div>
                </div>
                <div className="topBtn">
                  <img src={topBtn} alt="TOP버튼"/>
                </div>
                <footer>
                  <div className="footerInfo">월드 다이나믹 일회용 전자담배 기기 브랜드 페이지</div>
                  <p>COPYRIGHT. WORLD INTERNATIONAL. All Rights Reserved.</p>
                  <ul className="heading">
                    <li>전자담배</li>
                    <li>일회용 담배</li>
                    <li>액상 전자담배</li>
                    <li>베이프</li>
                    <li>전자담배 추천</li>
                    <li>전자담배 가격</li>
                    <li>전자담배 종류</li>
                    <li>전자담배 사용법</li>
                  </ul>
                </footer>
              </div>
            </section>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Dynamic01
