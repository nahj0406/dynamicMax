import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ImgTag from '@/components/ImgTag/ImgTag'
import Logo1 from '@/img/dynamic1/logo.png';

import Header from '@/components/Header/Header';
import Dynamic03 from './Dynamic03/Dynamic03.jsx';


const Dynamic01 = lazy(() => import('./Dynamic/Dynamic.jsx'));

function MainStation() {

  // 슬라이드 이동할때마다 onslidechange 값 header 저장하는 state
  const [slideDirection, setSlideDirection] = useState(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  return (
    <>
      <Header direction={slideDirection} isLastSlide={isLastSlide} />
      <Routes>
        <Route path="/" element={<App onSlideChange={setSlideDirection} />} />
        <Route path="/Dynamic" element={
            <Dynamic01 onSlideChange={setSlideDirection} onLastSlideChange={setIsLastSlide} />
          }
        />
        <Route path="/Dynamic03" element={<Dynamic03 />} />
      </Routes>
    </>
  );
}

export default MainStation;