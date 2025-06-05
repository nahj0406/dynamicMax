import {Children, useState, useEffect} from 'react'



function ImgTag({src, alt, clsName}) {
   return (
      <img className={clsName} src={src} alt={alt} draggable="false" />
   )
}


export default ImgTag;