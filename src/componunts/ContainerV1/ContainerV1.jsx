import React, {Children, useState} from 'react'
import '../../css/App.css'

function ContainerV1({ children, widthSize }) {

   return (
      <div className='containerV1' style={{maxWidth: `${widthSize}`,}}>
         {children}
      </div>
   )
}

export default ContainerV1;