import { useEffect } from 'react';
import ScrollOut from 'scroll-out';


function useScrollOut({ targetClass, animateCalss }) {
   useEffect(() => {

    const elements = Array.from(document.querySelectorAll(`.${targetClass}`));

    const scrollOutInstance = ScrollOut({
        targets: `.${targetClass}`,
        threshold: 0.5,
        once: true, // 요소가 한 번만 감지되도록 설정
        onShown: function (el) {
          // 요소가 뷰포트에 들어왔을 때 실행
          const index = elements.indexOf(el);
          const isWideScreen = window.innerWidth <= 1920 && window.innerWidth >= 768;
          const delay = isWideScreen
          ? (index >= 4 ? 100 : index * 700)
          : index * 200;

          setTimeout(() => {
            el.classList.add(`${animateCalss}`); // 순차적으로 animate 클래스 추가
          }, delay);
        },
    });

    return () => {
        scrollOutInstance.teardown(); // ScrollOut 인스턴스 정리
    };
  }, []);
}


export default useScrollOut