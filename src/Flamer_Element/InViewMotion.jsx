// import {Children, useState, useEffect} from 'react'
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";



function InViewMotion({children, scrollUp,}) {

   const { ref, inView } = useInView({
      threshold: 0.3, // 30% 보이면 true
      triggerOnce: true, // true면 한번만 동작
      rootMargin: '-300px 0px',
      // rootMargin: '0px',
   });


   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y: scrollUp }}
         animate={inView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 0.5 }}
      >
         {children}
      </motion.div>
   )
}


export default InViewMotion;