import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';

import Header from '@/components/Header/Header';
import Dynamic01 from './Dynamic01/Dynamic01.jsx';
import Dynamic03 from './Dynamic03/Dynamic03.jsx';

function MainStation() {
  const [slideDirection, setSlideDirection] = useState(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  return (
    <>
      <Header direction={slideDirection} isLastSlide={isLastSlide} />
      <Routes>
        <Route path="/" element={<App onSlideChange={setSlideDirection} />} />
        <Route path="/Dynamic01" element={<Dynamic01 onSlideChange={setSlideDirection} onLastSlideChange={setIsLastSlide} />} />
        <Route path="/Dynamic03" element={<Dynamic03 />} />
      </Routes>
    </>
  );
}

export default MainStation;