import React, {Children, useState} from 'react'
import '../../css/App.css'

function ContainerV1({ children  }) {

   return (
      <div className='containerV1'>
         {children}
      </div>
   )
}

export default ContainerV1;