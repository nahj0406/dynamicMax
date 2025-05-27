import {useState} from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import ContainerV1 from '../ContainerV1/ContainerV1'

function Header() {
   return (
      <header id={styles.header}>
         <ContainerV1>
            <Link to='/'>home</Link>
            <Link to='/Slide1'>Slide1</Link>
         </ContainerV1>
      </header>
   )
}

export default Header;