"use client";
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { URText } from './Reusable/UR';

gsap.registerPlugin(ScrollTrigger)



const Story = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - slide in from left
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      })

      // Canvas container - fade in only (no scale to prevent centering issues)
      gsap.from(canvasContainerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5
      })

      // Description animation - slide in from right
      gsap.from(descRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id='story' className='flex flex-col justify-between px-4 sm:px-6 lg:px-12 py-12 sm:py-12 lg:py-15 md:h-screen'>
      {/* Title - Left aligned */}
      <div className='flex md:flex-row flex-col space-y-4 items-center w-full mb-4 sm:mb-6'>
        <h1 
          ref={titleRef}
          className='font-semibold md:text-left text-center text-[28px] sm:text-[36px] md:text-[48px] lg:text-[50px] xl:text-[50px] tracking-tighter leading-tight text-black'
        >
          The Story Behind <span className='text-[#E90000]'>AAURAA</span>
        </h1>
         <div className='w-full flex justify-end  sm:mt-6'>
        <p 
          ref={descRef}
          className='text-black md:text-left text-center text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-semibold max-w-full md:max-w-2xl lg:max-w-3xl'
        >
          At <span className='text-[#E90000]'>AAURAA</span>, we believe every connection begins with a spark &mdash; and that spark is YOU. The name AAURAA comes from the idea of energy and belonging. The &quot;UR&quot; in the center stands for Your Aura &mdash; because at the heart of every community are the people who make it come alive.
        </p>
      </div>
      </div>

      {/* 3D Canvas - Center */}
      <div className='w-full flex justify-center items-center flex-1 my-4 sm:my-6'>
        <div 
          ref={canvasContainerRef}
          className='w-full max-w-full md:max-w-2xl lg:max-w-4xl aspect-16/10 sm:aspect-video cursor-pointer'
          style={{ height: 'auto', minHeight: '300px', maxHeight: '550px' }}
        >
          <Canvas
            camera={{ position: [0, 0, 3.5], fov: 65 }}
            gl={{ antialias: true, alpha: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <spotLight position={[-5, 5, 5]} intensity={0.5} />

            <URText position={[0, 0, 0]} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={1.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />

            <Environment preset="city" />
          </Canvas>
        </div>
      </div>

      {/* Description - Bottom right */}
     
    </section>
  )
}

export default Story