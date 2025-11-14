"use client";
import React, { ReactNode, useRef, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

interface LenisProviderProps {
  children: ReactNode;
}

const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // register gsap plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // you can tweak these options
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      // syncTouch is useful on devices where touch behaviour is laggy
      syncTouch: false,
      // autoRaf lets lenis run its own raf loop
      autoRaf: true,
      // Allow scrolling back up
      infinite: false,
    });
    lenisRef.current = lenis;

    // Setup GSAP ScrollTrigger to update on lenis scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // If autoRaf is false, you need your own manual RAF loop. But when true:
    // you can optionally sync lenis's raf with gsap's ticker:
    gsap.ticker.add((time) => {
      // lenis.raf expects milliseconds
      lenis.raf(time * 1000);
    });

    // Cleanup on unmount
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;