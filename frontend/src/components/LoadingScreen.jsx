import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { AiOutlineCodeSandbox } from 'react-icons/ai';
import {motion} from "framer-motion"

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen flex justify-center items-center w-full h-screen flex-col bg-slate-200">
      <div className='w-full'>
        <motion.div initial={{paddingTop:30 , paddingBottom:30}} animate={{paddingTop:0 , paddingBottom:0}} transition={{duration:1 , repeat:Infinity , ease:"easeInOut" , type:"tween"}} className='w-full flex flex-col items-center h-[240px] justify-center'>
          <AiOutlineCodeSandbox className='text-slate-700 text-[300px]' />
        </motion.div>
        <div className='w-full flex flex-col items-center text-slate-700 text-6xl mb-10'>
          DevInfo
        </div>
      </div>
      <ProgressBar percentage={progress} />
    </div>
  );
};

export default LoadingScreen;