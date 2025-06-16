import { configureStore, createSlice } from "@reduxjs/toolkit";

// let count = useSelector((state)=> state.count) // 불러올땐 이렇게.


import slide01  from '@/img/dynamicMax/Sec3/sec3_slide01.png';
import slide02  from '@/img/dynamicMax/Sec3/sec3_slide02.png';
import slide03  from '@/img/dynamicMax/Sec3/sec3_slide03.png';
import slide04  from '@/img/dynamicMax/Sec3/sec3_slide04.png';
import slide05  from '@/img/dynamicMax/Sec3/sec3_slide05.png';

let sec3DataSlide = createSlice({
   name: 'sec3Data',
   initialState : [
      {
         url: slide01,
         name: 'metallic',
         text: '메탈릭 재질을 활용한 한층 더 고급스러운 외형',
      },

      {
         url: slide02,
         name: 'Dual Mesh Coil',
         text: '듀얼 메쉬 코일 적용으로 더 진하고 풍부한 맛표현',
      },

      {
         url: slide03,
         name: 'compact size',
         text: '가벼운 무게와 컴팩트한 사이즈에서 오는 심플함',
      },

      {
         url: slide04,
         name: 'ample capacity',
         text: '하루종일 베이핑 해도 걱정없는 10ml 넉넉한 용량',
      },

      {
         url: slide05,
         name: 'versatility port',
         text: `범용성 높은 C-type 충전 포트와 직관적인 배터리 잔량 표시`,
      },
   ],
   reducers: {}
})

export default configureStore({
   reducer: {
      sec3Data : sec3DataSlide.reducer,
   }
})
