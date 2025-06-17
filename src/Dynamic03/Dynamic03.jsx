import React, {useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import '@/css/dynamic3/style.css';

import ImgTag from '@/components/ImgTag/ImgTag'

import dynamic3Img from '@/img/dynamic3/dynamic3.png';

function Dynamic03() {
   return(
      <div id={'dynamic3'}>
        <ImgTag src={dynamic3Img} alt={'다이나믹3 커밍순'} />
        <div className={'txtBox'}>
          <p className={`title HemiHead`}>DYNAMIC III</p>
          <p className={'commingSoon HemiHead'}>COMMING SOON</p>
        </div>
      </div>
   )
}

export default Dynamic03