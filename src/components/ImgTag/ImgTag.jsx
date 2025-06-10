import {Children} from 'react'



function ImgTag({src, alt, clsName, ref}) {
   return (
      <img className={clsName} ref={ref} src={src} alt={alt} draggable="false" />
   )
}


export default ImgTag;