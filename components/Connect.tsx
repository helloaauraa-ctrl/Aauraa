"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTENTS = [
    {title:"AAURAA Creator", desc:'For community heads, coaches, and small businesses. Create unlimited communities & events, promote your gatherings, and grow your network organically.', button:"AED 200 / Year" , img:'https://ik.imagekit.io/99y1fc9mh/Aauraa/Frame%2051.png?updatedAt=1763027605108'},
    {title:"AAURAA Connect", desc:'For those who love hosting and bringing people together. Create unlimited events, manage RSVPs, and reach the right audience easily.', button:"AED 500 / Year" , img:'https://ik.imagekit.io/99y1fc9mh/Aauraa/Frame%2047.png?updatedAt=1763027610985'},
]

const Connect = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Animate cards
      gsap.from(".pricing-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <div ref={sectionRef} className="flex flex-col lg:flex-row items-start justify-between px-4 sm:px-6 lg:px-12  pb-10 md:pb-20 gap-8 lg:gap-12">
      <div className="flex flex-col items-start gap-1 lg:gap-3 lg:max-w-md xl:max-w-lg">
        <h1 ref={headingRef} className="text-black font-semibold text-[32px] sm:text-[38px] md:text-[44px] lg:text-[44px] leading-tight tracking-tight">
          Choose Your <br /> <span className="text-[#E90000]">Way to Connect</span>
        </h1>
        <p ref={descRef} className="max-w-full text-black/60 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed font-semibold">
          AAURAA is completely free for users — because discovering your community should never come at a cost. For creators, organizers, and community leaders, we offer two simple plans designed to help you grow, engage, and manage your communities effortlessly.
        </p>
      </div>
      <div ref={cardsRef} className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 w-full lg:w-auto">
        {CONTENTS.map((item, index)=>(
            <motion.div 
              key={index} 
              className="pricing-card relative w-full lg:w-[500px] xl:w-[413px] h-[540px] rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.03, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image 
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className={`absolute inset-0 flex flex-col p-6 lg:p-6 ${index === 1 ? 'justify-start' : 'justify-end'}`}>
                <motion.h2 
                  className="text-[#E90000] font-bold text-[24px] lg:text-[28px]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  {item.title}
                </motion.h2>
                <motion.p 
                  className="text-white/90 text-[12px] lg:text-[14px] md:leading-[18px] leading-[16px] mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  {item.desc}
                </motion.p>
                <motion.button 
                  className="bg-white/40 border border-[#D4EDF4] text-white font-semibold md:px-6 md:py-3 px-3 py-1  rounded-full w-fit transition-colors hover:bg-white hover:text-[#E90000]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.button}
                </motion.button>
              </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Connect;
