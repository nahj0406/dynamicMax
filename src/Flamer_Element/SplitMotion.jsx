import {Children, useState, useEffect} from 'react'
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Splitting from 'splitting';


function SplitMotion({children}) {

   useEffect(() => {
      Splitting();
   }, []);

   const { ref, inView } = useInView({
     threshold: 0.3, // 30% 보이면 true
     triggerOnce: true,
   });


   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y: 50 }}
         animate={inView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 0.5 }}
         data-splitting
      >
         {children}
      </motion.div>
   )
}


export default SplitMotion;