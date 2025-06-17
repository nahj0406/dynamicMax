


export function Dynamic01Script() {

// 미디어쿼리 설정
const mediaQueryTablet = window.matchMedia("(max-width: 1280px)");
const mediaQueryMobile = window.matchMedia("(max-width: 640px)");
let initialAnimationCompleted = false;


// window.Swiper.use && window.Swiper.use([window.Swiper.Mousewheel]);

// 전체 페이지 슬라이드 Swiper 설정
if (window.swiper && window.swiper.destroy) {
  window.swiper.destroy(true, true);
}
window.swiper = new Swiper('.view.swiper', {
  direction: 'vertical',
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  //   stopOnLastSlide: true
  // },
  loop: false,
  mousewheel: {
    enabled: false, // 초기에는 Swiper 스크롤 비활성화
  },
  // mousewheel: {
  //   enabled: true,
  //   sensitivity: 0.5,
  //   thresholdDelta: 50,
  //   thresholdTime: 300,
  //   releaseOnEdges: false,
  // },
  on: {
    slideChange(swiper) {
      const current = swiper.activeIndex;
      const prev = swiper.previousIndex;
      const direction = current > prev ? 'down' : 'up';
      const isLast = current === swiper.slides.length - 1;

      const event = new CustomEvent('slideDirectionChange', {
        detail: {direction, isLast} 
      });

      window.dispatchEvent(event);
    },
    slideChangeTransitionStart: function () {
      // console.log("Slide changed to:", this.activeIndex);
      const activeSection = document.querySelector('.swiper-slide-active section');

      // 1번 슬라이드 활성화 설정
      if (activeSection.classList.contains('section1')) {
        activateFirstSlide();
      }

      // 2번 슬라이드 활성화 설정
      if (activeSection.classList.contains('section2')) {
        activateSecondSlide(); // 2번 슬라이드 설정 함수 호출
      }

      // 3번 슬라이드 활성화 설정
      if (activeSection.classList.contains('section3')) {
        activateThirdSlide(); // 3번 슬라이드 설정 함수 호출
      }

      // 4번 슬라이드 활성화 설정
      if (activeSection.classList.contains('section4')) {
        activateFourthSlide(); // 4번 슬라이드 설정 함수 호출
      }

      // 5번 슬라이드 활성화 설정
      if (activeSection.classList.contains('section5')) {
        activateFifthSlide(); // 5번 슬라이드 설정 함수 호출
      }

      // 6번 슬라이드 활성화 설정
      if (activeSection.classList.contains('section6')) {
        activateSixthSlide(); // 6번 슬라이드 설정 함수 호출
      }

      // 7번 슬라이드 활성화 설정
      if (activeSection.classList.contains('section7')) {
        activateSeventhSlide(); // 7번 슬라이드 설정 함수 호출
      }

      // 9번 슬라이드 활성화 설정
      if (activeSection.classList.contains('section9')) {
        activateNinthSlide(); // 9번 슬라이드 설정 함수 호출
      }

    },
  },
});

// 마우스 스크롤 방향에 따른 nav 유무 설정 (Swiper1 설정 내부와 연결)
const nav = document.querySelector("header nav"); // nav 요소 선택
let previousIndex = 0; // 이전 슬라이드 인덱스 초기화
// topBtn 클릭 시 nav 나타나도록 설정
document.addEventListener("DOMContentLoaded", () => {
  const topBtn = document.querySelector(".conAboutUs .topBtn");

  topBtn.addEventListener("click", () => {
    // nav를 나타나게 함
    nav.classList.remove("nav-hidden");
  });
});


// 첫 번째 슬라이드 애니메이션 (기존 initialAnimation과 firstScrollAnimation 통합)
const activateFirstSlide = () => {
  // 이전 애니메이션 강제 중단 및 초기화
  gsap.killTweensOf([
    ".conMain-products",
    ".conMain-ellipseBox",
    ".conMain-text p",
    ".conMain-text.beMore",
    ".conMain-text.dynamic",
    ".conMain-scrollDownCircle"
  ]);

  // 초기 상태 설정
  gsap.set(".conMain-products", { opacity: 0.4, scale: 0.4 });
  gsap.set(".conMain-ellipseBox", { backgroundColor: "#ffffff" });

  // 애니메이션 실행
  const animationScale = mediaQueryMobile.matches
    ? 2.5
    : mediaQueryTablet.matches
    ? 1.8
    : 1;

  const ellipseBoxScale = mediaQueryMobile.matches
    ? 750
    : mediaQueryTablet.matches
    ? 450
    : 400;
  
  const conMainTextRightLeft = mediaQueryMobile.matches
    ? "5vw"
    : mediaQueryTablet.matches
    ? 40
    : "8vw";
  
  const ellipseBoxScaleY = mediaQueryMobile.matches
    ? 240
    : mediaQueryTablet.matches
    ? 140
    : 100;

  const ellipseBlink1 = mediaQueryMobile.matches
    ? "#F81884"
    : mediaQueryTablet.matches
    ? "#ffffff"
    : "#ffffff";
  
  const ellipseBlinkDuration = mediaQueryMobile.matches
  ? 0.3
  : mediaQueryTablet.matches
  ? 0.6
  : 0.6;

  gsap.timeline({
    onComplete: () => {
      initialAnimationCompleted = true;
      swiper.mousewheel.enable(); // 애니메이션 완료 후 Swiper 활성화
    },
  })
    .fromTo(
      ".conMain-products",
      { scale: 0.4, opacity: 0.4, filter: "blur(1.8vw)" },
      {
        scale: animationScale,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.inOut",
      }
    )
    .fromTo(
      ".conMain-ellipseBox",
      { opacity: 1, scale: 0 },
      { opacity: 1, scale: ellipseBoxScale, duration: 0.4, ease: "power1.inOut" },
      "<50%"
    )
    .fromTo(
      ".conMain-ellipseBox",
      { rotate: -15, backgroundColor: ellipseBlink1, borderRadius: "50%" },
      { rotate: -35, backgroundColor: "#F81884", borderRadius: 0, duration: 0.6, ease: "power3.inOut" },
      "<50%"
    )
    .fromTo(
      ".conMain-ellipseBox",
      { rotate: -35, backgroundColor: ellipseBlink1, borderRadius: "50%" },
      { scaleY: ellipseBoxScaleY, rotate: 35, backgroundColor: "#F81884", borderRadius: 0, duration: ellipseBlinkDuration, ease: "power3.inOut" },
      "<50%"
    )
    .fromTo(
      ".conMain-text p",
      { color: "#F81884" },
      { color: "#ffffff", duration: 0.6, ease: "power1.inOut" },
      "<"
    )
    .fromTo(
      ".conMain-text.beMore",
      { right: "100%", opacity: 0 },
      { right: conMainTextRightLeft, opacity: 1, duration: 0.4 }
    , "<")
    .fromTo(
      ".conMain-text.dynamic",
      { left: "100%", opacity: 0 },
      { left: conMainTextRightLeft, opacity: 1, duration: 0.4 }
    , "<90%")
    .fromTo(
      ".conMain-scrollDownCircle",
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    , "<");
    
};

// 초기 애니메이션 자동 실행
activateFirstSlide();


// 2번 슬라이드 애니메이션 설정 함수
const activateSecondSlide = () => {
  

  // 이전 애니메이션 강제 중단 및 초기화
  gsap.killTweensOf([
    ".conMain-products2",
    ".conMain-text2",
    ".conMain-text3",
    // ".conMain-text3 .count b",
    ".conMain-text4 .detail"
  ]);

  // 초기 상태 강제 설정
  gsap.set(".conMain-products2", { opacity: 0, scale: 0.9 });
  gsap.set(".conMain-text2", { opacity: 0, y: 50 });
  gsap.set(".conMain-text3", { opacity: 0, y: 50 });
  // gsap.set(".conMain-text3 .count b", { innerText: 0 });
  gsap.set(".conMain-text4 .detail", { opacity: 0, y: 20 });
  
  // 애니메이션 실행
  gsap.timeline()
    .fromTo(
      ".conMain-products2",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 2, ease: "power3.out" }
    , "<")
    .fromTo(
      ".conMain-text2",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.1 },
      "<"
    )
    .fromTo(
      ".conMain-text3",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.2 },
      "<"
    )
    .fromTo(
      ".conMain-text4 .detail",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out", delay: 0.3},
      "<"
    );
};

// 3번 슬라이드 애니메이션 설정 함수
const activateThirdSlide = () => {
// 이전 애니메이션 강제 중단 및 초기화
gsap.killTweensOf([
  ".conMain-products3",
  ".conMain-text4-2",
  ".conMain-text5",
  ".conMain-text6"
]);

// 초기 상태 강제 설정
gsap.set(".conMain-products3", { opacity: 0, scale: 0.9 });
gsap.set(".conMain-text4-2", { opacity: 0, y: 50 });
gsap.set(".conMain-text5", { opacity: 0, y: 50 });
gsap.set(".conMain-text6", { opacity: 0, y: 50 });

// 애니메이션 실행
gsap.timeline()
  .fromTo(
    ".conMain-products3",
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 2, ease: "power3.out" }
  , "<")
  .fromTo(
    ".conMain-text4-2",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0 },
    "<"
  )
  .fromTo(
    ".conMain-text5",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.2 },
    "<"
  )
  .fromTo(
    ".conMain-text6",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.4 },
    "<"
  );
};

// 4번 슬라이드 애니메이션 설정 함수
const activateFourthSlide = () => {
// 이전 애니메이션 강제 중단 및 초기화
gsap.killTweensOf([
  ".conQuality-bestQuality",
  ".conQuality-bestQuality img.afterimage",
  ".conQuality-1-text2",
  ".conQuality-1-text3",
  ".conQuality-1-text2 img.afterimage",
  ".conQuality-1-text3 img.afterimage"
]);

// 초기 상태 강제 설정
gsap.set(".conQuality-bestQuality", { opacity: 0.5, transform: "scale(2)" });
gsap.set(".conQuality-bestQuality img.afterimage", { opacity: 1, transform: "scale(1)" });
gsap.set(".conQuality-1-text2", { opacity: 0, transform: "scale(2)" });
gsap.set(".conQuality-1-text2 img.afterimage", { opacity: 1, transform: "scale(1)" });
gsap.set(".conQuality-1-text3", { opacity: 0, transform: "scale(2)" });
gsap.set(".conQuality-1-text3 img.afterimage", { opacity: 1, transform: "scale(1)" });

// 애니메이션 실행
gsap.timeline()
  .fromTo('.conQuality-bestQuality', 
    { opacity: 0.5, transform: 'scale(2)' },
    { opacity: 1, transform: 'scale(0.8)', duration: 0.3 }
  , "<")
  .fromTo('.conQuality-bestQuality img.afterimage', 
    { opacity: 1, transform: 'scale(1)' }, 
    { opacity: 0, transform: 'scale(1.3)' }
    , "<80%")
  .fromTo('.conQuality-1-text2', 
    { opacity: 0, transform: 'scale(2)' },
    { opacity: 1, transform: 'scale(1)', duration: 0.3 }
  , "<20%")
  .fromTo('.conQuality-1-text2 img.afterimage', 
    { opacity: 1, transform: 'scale(1)' }, 
    { opacity: 0, transform: 'scale(1.3)' }
    , "<80%")
  .fromTo('.conQuality-1-text3', 
    { opacity: 0, transform: 'scale(2)' },
    { opacity: 1, transform: 'scale(1)', duration: 0.3 }
  , "<20%")
  .fromTo('.conQuality-1-text3 img.afterimage', 
    { opacity: 1, transform: 'scale(1)' }, 
    { opacity: 0, transform: 'scale(1.3)' }
    , "<80%")

};

// 5번 슬라이드 애니메이션 설정 함수
const activateFifthSlide = () => {
// 이전 애니메이션 강제 중단 및 초기화
gsap.killTweensOf([
  ".conQuality-text2 .imgBox .txtBox",
  ".conQuality-text2 .imgBox .afterimage",
  ".conQuality-2-text2",
  ".conQuality-2-text2 img.afterimage",
  ".conQuality-2-text3",
  ".conQuality-2-text3 img.afterimage"
]);

// 초기 상태 강제 설정
gsap.set(".conQuality-text2 .imgBox .txtBox", { opacity: 0.5, transform: 'scale(2)' });
gsap.set(".conQuality-text2 .imgBox .afterimage", { opacity: 1, transform: 'scale(1)' });
gsap.set(".conQuality-2-text2", { opacity: 0, transform: 'scale(2)' });
gsap.set(".conQuality-2-text2 img.afterimage", { opacity: 1, transform: 'scale(1)' });
gsap.set(".conQuality-2-text3", { opacity: 0, transform: 'scale(2)' });
gsap.set(".conQuality-2-text3 img.afterimage", {  opacity: 1, transform: 'scale(1)' });

// 애니메이션 실행
gsap.timeline()
  .fromTo('.conQuality-text2 .imgBox .txtBox', 
    { opacity: 0.5, transform: 'scale(2)' },
    { opacity: 1, transform: 'scale(1)', duration: 0.3 }
  , "<")
  .fromTo('.conQuality-text2 .imgBox .afterimage', 
    { opacity: 1, transform: 'scale(1)' }, 
    { opacity: 0, transform: 'scale(1.3)' }
    , "<80%")
  .fromTo('.conQuality-2-text2', 
    { opacity: 0, transform: 'scale(2)' },
    { opacity: 1, transform: 'scale(1)', duration: 0.3 }
  , "<20%")
  .fromTo('.conQuality-2-text2 img.afterimage', 
    { opacity: 1, transform: 'scale(1)' }, 
    { opacity: 0, transform: 'scale(1.3)' }
    , "<80%")
  .fromTo('.conQuality-2-text3', 
    { opacity: 0, transform: 'scale(2)' },
    { opacity: 1, transform: 'scale(1)', duration: 0.3 }
  , "<20%")
  .fromTo('.conQuality-2-text3 img.afterimage', 
    { opacity: 1, transform: 'scale(1)' }, 
    { opacity: 0, transform: 'scale(1.3)' }
    , "<80%")
};

// 6번 슬라이드 애니메이션 설정 함수
const activateSixthSlide = () => {
// 이전 애니메이션 강제 중단 및 초기화
gsap.killTweensOf([
  ".conQuality-text3 .detail .underline",
  ".conQuality-bg.blue",
  ".conQuality-text3",
  ".conQuality-text4",
  ".conQuality-text4 .detail span",
  ".conQuality-text4-1",
  ".conQuality-text4-1 .world",
  ".conQuality-text4-1 .songni",
  ".conQuality-text4-1 .max1",
  ".conQuality-text4-1 .max2",
  ".conQuality-text4-1 .maxBox.index0 p",
  ".conQuality-text4-1 .maxBox.index1 p"
]);

// 초기 상태 강제 설정
gsap.set(".conQuality-bg.blue", { backgroundColor: "#720EFF" });
gsap.set(".conQuality-text3 .detail .underline", { width: 0 });
gsap.set(".conQuality-text3", { top: "50%", opacity: 1 });
gsap.set(".conQuality-text4", { opacity: 0, left: 0 });
gsap.set(".conQuality-text4 .detail span", { opacity: 0 });
gsap.set(".conQuality-text4-1", { y: "400px", opacity: 0 });
gsap.set(".conQuality-text4-1 .world", { y: "20px", opacity: 1 });
gsap.set(".conQuality-text4-1 .songni", { y: "20px", opacity: 1 });
gsap.set(".conQuality-text4-1 .max1", { y: "20px", opacity: 0 });
gsap.set(".conQuality-text4-1 .max2", { y: "20px", opacity: 0 });
gsap.set(".conQuality-text4-1 .maxBox.index0 p", { y: "20px", opacity: 0 });
gsap.set(".conQuality-text4-1 .maxBox.index1 p", { y: "20px", opacity: 0 });

// 애니메이션 실행
const animationTop = mediaQueryMobile.matches
? "-16vw"
: mediaQueryTablet.matches
? "-10vw"
: "-3vw";
const animationLeft = mediaQueryMobile.matches
? "0"
: mediaQueryTablet.matches
? "-85%"
: "-75%";
const animationTop2 = mediaQueryMobile.matches
? "-60%"
: mediaQueryTablet.matches
? "0"
: "0";
const animationTop3 = mediaQueryMobile.matches
? "-30%"
: mediaQueryTablet.matches
? "0"
: "0";
const animationY = mediaQueryMobile.matches
? "330%"
: mediaQueryTablet.matches
? "220%"
: "150%";

gsap.timeline()
  .fromTo('.conQuality-bg.blue', 
      { backgroundColor: "#720EFF" },
      { backgroundColor: "#0E6EFF", delay: 0.2, duration: 0.4 }
  , "<")
  .fromTo('.conQuality-text3 .detail .underline',
    { width: 0 },
    { width: "100%", duration: 0.2 }
  , "<50%")
  .fromTo('.conQuality-text3', 
    { top: "50%" },
    { top: animationTop, duration: 0.4 }
  , "<180%")
  .fromTo('.conQuality-text4-1', 
    { y: animationY, opacity: 0 },
    { y: "0px", opacity: 1, duration: 0.4 }
  , "<")
  .fromTo('.conQuality-text4-1 .world', 
    { y: "20px", opacity: 1 },
    { y: "0", opacity: 0, duration: 0.4 }
  , "<150%")
  .fromTo('.conQuality-text4-1 .songni', 
    { y: "20px", opacity: 1 },
    { y: "0", opacity: 0, duration: 0.4 }
  , "<30%")
  .fromTo('.conQuality-text4-1 .max1', 
    { y: "20px", opacity: 0 },
    { y: "0", opacity: 1, duration: 0.4 }
  , "<100%")
  .fromTo('.conQuality-text4-1 .max2', 
    { y: "20px", opacity: 0 },
    { y: "0", opacity: 1, duration: 0.4 }
  , "<30%")
  .fromTo('.conQuality-text4-1 .maxBox.index0 p', 
    { y: "20px", opacity: 0 },
    { y: "0", opacity: 1, duration: 0.4 }
  , "<100%")
  .fromTo('.conQuality-text4-1 .maxBox.index1 p', 
    { y: "20px", opacity: 0 },
    { y: "0", opacity: 1, duration: 0.4 }
  , "<30%")

};

// 7번 슬라이드 애니메이션 설정 함수
const activateSeventhSlide = () => {
// 이전 애니메이션 강제 중단 및 초기화
gsap.killTweensOf([
  ".conQuality-experts-text .blueCircle",
  ".conQuality-experts-text .detail"
]);

// 초기 상태 강제 설정
gsap.set(".conQuality-experts-text .blueCircle", { scale: 100, left: "50%" });
gsap.set(".conQuality-experts-text .detail", { x: -100, opacity: 0 });

// 애니메이션 실행
gsap.timeline()
.fromTo('.conQuality-experts-text .blueCircle', 
    { scale: 100 },
    { scale: 1, duration: 0.8, ease: "power3.out" }
, "<")
.fromTo('.conQuality-experts-text .blueCircle', 
    { left: "50%" },
    { left: 0, duration: 0.8, ease: "power3.out" }
)
.fromTo('.conQuality-experts-text .detail', 
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, stagger: { each: 0.1 }, duration: 0.8, ease: "power3.out" }
, "<30%")
};



// 9번 슬라이드 애니메이션 설정 함수
const activateNinthSlide = () => {
// 이전 애니메이션 강제 중단 및 초기화
gsap.killTweensOf([
  ".conAboutUs-descriptionBox",
  ".conAboutUs-topBtn"
]);

// 초기 상태 강제 설정
gsap.set(".conAboutUs-descriptionBox", { opacity: 0});
gsap.set(".conAboutUs-topBtn", { opacity: 0});

// 애니메이션 실행
gsap.timeline()
.fromTo(".conAboutUs-descriptionBox", 
  { opacity: 0 },
  { opacity: 1, duration: 1 }
, "<")
.fromTo(".conAboutUs-topBtn", 
  { opacity: 0 },
  { opacity: 1, duration: 1 }
, "<")

};









// 스크롤 이벤트 처리
window.addEventListener(
  "wheel",
  (event) => {
    if (!initialAnimationCompleted) {
      event.preventDefault();
    }
  },
  { passive: false }
);







// Flavor swiper 설정
  // swiper 설정
  if (window.swiper2 && window.swiper2.destroy) {
    window.swiper2.destroy(true, true);
  }
  window.swiper2 = new Swiper('.swiper.flavor', {
      // Optional parameters
      direction: 'horizontal',
      slidesPerView: 3,
      spaceBetween: 0,
      nested: true,
      loop: true,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper.flavor .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper.flavor .swiper-button-next",
        prevEl: ".swiper.flavor .swiper-button-prev",
      },
      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 3,
        },
        0: {
          slidesPerView: 1,
        }
      },
  });


  // [conFlavor 의 이미지 슬라이드에 해당하는 맛 설명 나오는 함수]
  // 설명 업데이트 함수
  function updateDescription(flavor) {
    // 모든 설명 숨기기
    document.querySelectorAll('.conFlavor-description .list').forEach(list => {
      list.classList.remove('active');
    });

    // 현재 맛에 해당하는 설명 보이기
    const activeDescription = document.querySelector(`.conFlavor-description .list[data-flavor="${flavor}"]`);
    if (!activeDescription) return;

    activeDescription.classList.add('active');

    const getValue = (selector) => {
      const el = activeDescription.querySelector(selector);
      return el?.dataset?.value || 0;
    };

    const setBar = (selector, value) => {
      const el = activeDescription.querySelector(selector);
      if (el) {
        el.style.width = '0%';
        requestAnimationFrame(() => {
          el.style.width = `${value * 10}%`;
        });
      }
    };

    // 바 값들
    const sweetnessValue = getValue('.sweetness .value');
    const sourValue = getValue('.sour .value');
    const neckValue = getValue('.neck .value');
    const weightValue = getValue('.weight .value');
    const coolingValue = getValue('.cooling .value');

    // 적용
    setBar('.sweetness .value', sweetnessValue);
    setBar('.sour .value', sourValue);
    setBar('.neck .value', neckValue);
    setBar('.weight .value', weightValue);
    setBar('.cooling .value', coolingValue);
  }

  // 초기 설명 표시
  const initialSlide = window.swiper2.slides[window.swiper2.activeIndex];
  const initialFlavor = initialSlide.getAttribute('data-flavor');
  updateDescription(initialFlavor);

  // 슬라이드 변경 시 설명 업데이트
  window.swiper2.on('slideChange', function () {
    const activeSlide = window.swiper2.slides[window.swiper2.activeIndex];
    const activeFlavor = activeSlide.getAttribute('data-flavor');
    updateDescription(activeFlavor);
  });


  // [swiper 각 슬라이드 클릭 시 active 상태로 변경]
  let swiper2Slides = document.querySelectorAll('.conFlavor .conFlavor-imgs .swiper-slide');
  swiper2Slides.forEach((slide, index) => {
      slide.addEventListener("click", (event) => {
          // 클릭된 슬라이드의 인덱스 가져오기
          const slideIndex = index;

          // 해당 슬라이드로 이동
          window.swiper2.slideToLoop(slideIndex);

          // 모든 슬라이드에서 active 클래스 제거
          swiper2Slides.forEach(slide => {
              slide.classList.remove("swiper-slide-active");
          });
          // 클릭한 슬라이드에 active 클래스 추가
          slide.classList.add("swiper-slide-active");

          // 해당하는 맛 설명으로 변화
          const clickedSlide = event.currentTarget;
          const clickedFlavor = clickedSlide.getAttribute('data-flavor');
          updateDescription(clickedFlavor);
      });
  });



  // 첫 화면의 scrollDownCircle 클릭 시 두 번째 슬라이드로 이동
  const scrollDownCircle = document.querySelector(".conMain-scrollDownCircle");

  scrollDownCircle.addEventListener("click", () => {
    swiper.slideTo(1, 1000, false);
    activateSecondSlide();
    // nav 숨김
    nav.classList.add("nav-hidden");
  });

  // 첫 화면의 scrollDown 클릭 시 두 번째 슬라이드로 이동
  const scrollDown = document.querySelector(".conMain-scrollDown");

  scrollDown.addEventListener("click", () => {
    swiper.slideTo(1, 1000, false);
    activateSecondSlide();
    // nav 숨김
    nav.classList.add("nav-hidden");
  });


  // top 버튼 클릭 시 상단 이동
  const topBtn = document.querySelector(".conAboutUs .topBtn");

  const navigateToSlide = (index) => {
    // 특정 슬라이드로 이동
    swiper.slideTo(index, 1000, false);

    // transitionEnd 이벤트가 발생하면 마우스 휠 활성화
    swiper.once("transitionEnd", () => {
      swiper.mousewheel.enable(); // 마우스 휠 활성화
    });
  };

  // top 버튼 클릭 시
  topBtn.addEventListener("click", () => {
    navigateToSlide(0);
    setTimeout(() => {
      activateFirstSlide();
    }, 500);
  });

}



