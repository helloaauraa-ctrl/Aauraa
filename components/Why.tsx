"use client";
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);


const IMAGES = [
    {img: 'https://ik.imagekit.io/99y1fc9mh/Aauraa/Link%20(10).png?updatedAt=1763102268984'},
    {img: 'https://ik.imagekit.io/99y1fc9mh/Aauraa/Link%20(9).png?updatedAt=1763026633378'},

]

const Why = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate description
      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate images
      gsap.from(".why-image-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={sectionRef} className='flex flex-col  px-4 sm:px-6 lg:px-12 md:py-20  py-10 gap-8 md:gap-12'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8'>
            <h1 ref={headingRef} className='text-black font-semibold text-[32px] sm:text-[38px] md:text-[44px] lg:text-[50px] leading-tight tracking-tight'>
              Why People Love <br /> <span className='text-[#E90000]'>AAURAA</span>
            </h1>
            <p ref={descRef} className='max-w-full lg:max-w-xl xl:max-w-3xl text-black/60 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed font-semibold'>
              Because connection is the new currency &mdash; and belonging is what makes us human. AAURAA is here to make sure that no one feels alone in a city full of possibilities.
            </p>
        </div>
        <div ref={imagesRef} className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full'>
           {IMAGES.map((item, index) => (
             <motion.div 
               key={index} 
               className='why-image-card w-full md:w-1/2 relative md:h-[400px] h-[300px]'
               
               transition={{ duration: 0.3, ease: "easeOut" }}
             >
               <Image 
                 src={item.img} 
                 alt={`image-${index}`} 
                 fill
                 className='object-cover rounded-lg'
                 sizes='(max-width: 768px) 100vw, 50vw'
               />
             </motion.div>
           ))}
        </div>

    </div>
  )
}

export default Why