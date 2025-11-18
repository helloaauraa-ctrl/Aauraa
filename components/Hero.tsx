"use client";
import { A, R, U } from "@/assets/Logo";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import Whatsapp from "@/assets/whatsapp.png";

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = logoRef.current?.querySelectorAll(".letter");

    if (letters) {
      gsap.set(letters, { opacity: 0, y: 80, scale: 0.8 });
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        ease: "power4.out",
        duration: 1.2,
        delay: 0.5,
      });
    }
  }, []);
  return (
    <div id="hero" className="relative w-full h-screen">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        poster="https://ik.imagekit.io/99y1fc9mh/Aauraa/IMG_9305.jpg?updatedAt=1763102760441"
      >
        <source
          src="https://ik.imagekit.io/99y1fc9mh/Aauraa/AAURAA%20updated%202.mp4?updatedAt=1763102206912"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay (to darken video slightly) */}
      <div className="absolute inset-0 z-10 bg-black/30"></div>

      <Link
        href="/forms"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute z-50 top-10 md:right-10 right-5 bg-[#D4EDF4CC] text-[#E90000] font-semibold rounded-full md:px-8 px-4 md:text-[14px] text-[12px] py-2.5 flex items-center justify-center cursor-pointer hover:bg-[#E90000] hover:text-white transition-colors duration-300"
      >
        REGISTER NOW
      </Link>

      <div className="fixed bottom-4 right-4 z-50 flex flex-row items-center justify-center ">
        <Link
          href="https://wa.me/+971509690564"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row-reverse items-center justify-center gap-2 bg-white/50 px-4 py-2 rounded-full"
        >
          <p className="text-black">971509690564</p>
          <Image src={Whatsapp} alt="WhatsApp Chat" className="w-8 h-8" />
        </Link>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <div>
          <div
            ref={logoRef}
            className="relative z-10 flex items-center justify-center h-full gap-2 -mt-10"
          >
            <Image src={A} alt="A" className="md:w-20 w-15 h-auto letter" />
            <Image src={A} alt="A" className="md:w-20 w-15 h-auto letter" />
            <Image src={U} alt="U" className="md:w-20 w-15 h-auto letter" />
            <Image src={R} alt="R" className="md:w-20 w-15 h-auto letter" />
            <Image src={A} alt="A" className="md:w-20 w-15 h-auto letter" />
            <Image src={A} alt="A" className="md:w-20 w-15 h-auto letter" />
          </div>

          <p className="text-white font-semibold md:text-2xl text-xl tracking-tight pt-5">
            Find UR Vibe, Find UR Community
          </p>
        </div>

        <a
          href="#story"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById("story");
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="group absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 
             text-[#E90000] bg-[#D4EDF4CC] rounded-full text-sm md:text-base 
             font-light tracking-tight cursor-pointer 
             hover:bg-[#E90000] hover:text-white transition-colors duration-300"
        >
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 md:py-3">
            {/* Animated Dots */}
            <div className="flex items-center justify-center gap-2">
              <div className="dot-animation bg-[#E90000] group-hover:bg-white animation-delay-0" />
              <div className="dot-animation bg-[#E90000] group-hover:bg-white animation-delay-750" />
            </div>

            {/* Static Text */}
            <span
              className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold 
                     text-[#E90000] group-hover:text-white whitespace-nowrap leading-none"
            >
              Dive Into the Vibe
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Hero;
