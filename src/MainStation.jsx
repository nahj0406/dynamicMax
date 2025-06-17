import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Dynamic01 from './Dynamic01/Dynamic01.jsx';
import Header from '@/components/Header/Header';

function MainStation() {
  const [slideDirection, setSlideDirection] = useState(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  return (
    <>
      <Header direction={slideDirection} isLastSlide={isLastSlide} />
      <Routes>
        <Route path="/" element={<App onSlideChange={setSlideDirection} />} />
        <Route path="/Dynamic01" element={<Dynamic01 onSlideChange={setSlideDirection} onLastSlideChange={setIsLastSlide} />} />
      </Routes>
    </>
  );
}

export default MainStation;