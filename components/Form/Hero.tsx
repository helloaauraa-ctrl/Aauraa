"use client";
import Image from "next/image";
import Link from "next/link";


const Hero = () => {
  return (
    <>
      <div className="flex flex-col justify-between h-screen shadow-2xl p-6 sm:p-8">
        {/* Title */}
        <div className="max-w-sm mx-auto">
          <div className="relative w-full rounded-lg overflow-hidden">
            <Link href="/">
             <Image
              src="https://ik.imagekit.io/99y1fc9mh/Aauraa/Mask%20group.png?updatedAt=1763033392868"
              alt="Event"
              width={500}
              height={20}
              className="py-5 "
            />
            </Link>
           
          </div>
        </div>

        <div>
 <h1 className="text-[26px] leading-[30px] sm:text-[80px] sm:leading-[90px] font-medium tracking-tighter uppercase text-black mb-4 pr-8 text-center">
          Welcome to <span className="text-[#E90000] font-bold">AAURAA&apos;s</span> <br />
          {" "}Inner Circle
        </h1>
        {/* Description */}
        <p className="text-sm sm:text-base text-black text-center mb-6 font-semibold max-w-lg mx-auto tracking-tight ">
          Thank you for your interest in joining the AAURAA, a community and
          events app built to connect people through shared interests and
          meaningful experiences.
        </p>
        </div>
       

        {/* CTA Button */}
        <div className="flex justify-center pt-8">
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 md:py-3">
            {/* Animated Dots */}
            <div className="flex items-center justify-center gap-2">
              <div className="dot-animation bg-[#E90000]  animation-delay-750" />
            </div>

            {/* Static Text */}
            <span
              className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold 
                     text-[#E90000]  whitespace-nowrap leading-none"
            >
             Scroll down to connect with us
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
