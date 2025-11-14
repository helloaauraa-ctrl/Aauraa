"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const CONTENTS = [
    {no:'01', title:"Community Builders", desc:'Create spaces where people feel connected and inspired.' , img:'https://ik.imagekit.io/99y1fc9mh/Aauraa/Background+Shadow.png?updatedAt=1763028852041'},
    {no:'02', title:"Coaches & Mentors", desc:'Host private or group sessions, build your audience, and grow your presence.', img:'https://ik.imagekit.io/99y1fc9mh/Aauraa/Background+Shadow%20(1).png?updatedAt=1763028851901'},
    {no:'03', title:"Event Hosts & Organizers", desc:'List events, connect with the right crowd, and simplify your reach.', img:'https://ik.imagekit.io/99y1fc9mh/Aauraa/Background+Shadow%20(2).png?updatedAt=1763028851912'},
    {no:'04', title:"Small Business Owners", desc:'Find niche communities, network, and promote your initiatives.', img:'https://ik.imagekit.io/99y1fc9mh/Aauraa/Background+Shadow%20(3).png?updatedAt=1763028851985'},
    {no:'05', title:"Everyday Seekers ", desc:'Those looking to belong, explore new passions, and find their vibe.', img:'https://ik.imagekit.io/99y1fc9mh/Aauraa/Frame%2035.png?updatedAt=1763028851048'},
]

const MadeForEveryone = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 md:py-20 ">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
      <div className="flex flex-col items-start gap-1 lg:gap-3 lg:max-w-md xl:max-w-lg">
        <h1 className="text-[#E90000] font-semibold text-[32px] sm:text-[38px] md:text-[44px] lg:text-[44px] leading-tight tracking-tight">
          Made for Everyone <br /> <span className="text-black">Who Loves to Connect</span>
        </h1>
        
      </div>
      
      {/* Mobile: Horizontal scroll for all 5 cards */}
      <div className="flex lg:hidden overflow-x-auto gap-6 w-full pb-4 snap-x snap-mandatory scrollbar-hide">
        {CONTENTS.map((item, index)=>(
            <div 
              key={index} 
              className="flex-shrink-0 w-[280px] rounded-lg snap-start"
            >
              <div className="flex flex-col h-full p-4">
                  <div className="flex flex-row items-center gap-3 overflow-hidden">
                <h3 className="text-black/60 hover:text-white bg-transparent hover:bg-black border rounded-[12px] w-fit px-2 py-1 border-black/40 font-bold text-[14px] mb-2 whitespace-nowrap">{item.no}</h3>
                  <div className="relative flex-1 h-px bg-black/10 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-[#E90000]/60 to-transparent"
                      initial={{ x: '-200%' }}
                      animate={{
                        x: '200%',
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                        repeatDelay: 1,
                      }}
                    />
                  </div>
                  </div>
                <h2 className="text-black font-bold text-[18px] mb-2">{item.title}</h2>
                <p className="text-black/60 text-[13px] leading-[18px] mb-3">{item.desc}</p>
                <div className="relative w-full h-[320px] mt-auto overflow-hidden rounded-lg">
                  <Image 
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
              </div>
            </div>
        ))}
      </div>

      {/* Desktop: Original layout */}
      <div className="hidden lg:flex flex-col gap-6 lg:gap-8 w-full lg:w-[60%]">
        {/* Top row - 2 cards */}
        <div className="flex flex-row items-center justify-center gap-6 lg:gap-8">
          {CONTENTS.slice(0, 2).map((item, index)=>(
              <div 
                key={index} 
                className="w-full rounded-lg"
              >
                <div className="flex flex-col h-full p-6">
                    <div className="flex flex-row items-center gap-3 sm:gap-4 overflow-hidden">
                  <h3 className="text-black/60 hover:text-white bg-transparent hover:bg-black border rounded-[12px] w-fit px-3 py-1 border-black/40 font-bold text-[18px] mb-2 whitespace-nowrap">{item.no}</h3>
                    <div className="relative flex-1 h-px bg-black/10 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-[#E90000]/60 to-transparent"
                        initial={{ x: '-200%' }}
                        animate={{
                          x: '200%',
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                          repeatDelay: 1,
                        }}
                      />
                    </div>
                    </div>
                  <h2 className="text-black font-bold text-[20px] mb-3">{item.title}</h2>
                  <p className="text-black/60 text-[14px] leading-[20px] mb-4">{item.desc}</p>
                  <div className="relative w-full max-w-full h-[396px] mt-auto overflow-hidden rounded-lg">
                    <Image 
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 315px"
                    />
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
      </div>
      
      {/* Bottom row - 3 cards (Desktop only) */}
      <div className="hidden lg:flex flex-row items-start justify-start gap-6 lg:gap-8 ">
        {CONTENTS.slice(2, 5).map((item, index)=>(
            <div 
              key={index + 2} 
              className="w-full rounded-lg"
            >
              <div className="flex flex-col h-full p-6">
                  <div className="flex flex-row items-center gap-3 sm:gap-4 overflow-hidden">
                <h3 className="text-black/60 hover:text-white bg-transparent hover:bg-black border rounded-[12px] w-fit px-3 py-1 border-black/40 font-bold text-[18px] mb-2 whitespace-nowrap">{item.no}</h3>
                  {index < CONTENTS.slice(2, 5).length - 1 && (
                    <div className="relative flex-1 h-px bg-black/10 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-[#E90000]/60 to-transparent"
                        initial={{ x: '-200%' }}
                        animate={{
                          x: '200%',
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (index + 2) * 0.5,
                          repeatDelay: 1,
                        }}
                      />
                    </div>
                  )}
                </div>
                <h2 className="text-black font-bold text-[20px] mb-3">{item.title}</h2>
                <p className="text-black/60 text-[14px] leading-[20px] mb-4 md:w-[90%] ">{item.desc}</p>
                <div className="relative w-full max-w-full h-[396px] mt-auto overflow-hidden rounded-lg">
                  <Image 
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 315px"
                  />
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  
  );
};

export default MadeForEveryone;