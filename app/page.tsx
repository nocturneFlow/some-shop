"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const ANIMATION_CONFIG = {
  hover: {
    duration: 0.3,
    ease: "power2.out",
    scale: 1.015, // More subtle scale
  },
  blob: {
    duration: { min: 15, max: 25 }, // Slower, more subtle movement
    scale: { min: 0.9, max: 1.1 }, // More constrained scale
    position: { min: -30, max: 30 }, // More controlled movement
  },
} as const;

export default function WelcomePage() {
  const [hoveredSection, setHoveredSection] = useState<"left" | "right" | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  const refs = {
    left: useRef(null),
    right: useRef(null),
    title: useRef(null),
    container: useRef(null),
  };

  // Memoized handlers
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleHover = useCallback(
    (section: "left" | "right" | null) => {
      if (isMobile) return;

      setHoveredSection(section);
      const ctx = gsap.context(() => {
        if (section === "left" || section === "right") {
          const activeRef = section === "left" ? refs.left : refs.right;
          const inactiveRef = section === "left" ? refs.right : refs.left;
          const rotation = section === "left" ? -1 : 1;
          const color =
            section === "left"
              ? "rgba(72, 187, 120, 0.3)"
              : "rgba(159, 122, 234, 0.3)";

          gsap.to(activeRef.current, {
            backgroundColor: `rgba(${
              section === "left" ? "50, 200, 100" : "150, 100, 200"
            }, 0.1)`,
            scale: ANIMATION_CONFIG.hover.scale,
            rotation,
            duration: ANIMATION_CONFIG.hover.duration,
            ease: ANIMATION_CONFIG.hover.ease,
          });

          gsap.to(inactiveRef.current, {
            filter: "brightness(0.5) blur(2px)",
            scale: 0.98,
            duration: ANIMATION_CONFIG.hover.duration,
          });

          // Handle gradients
          gsap.to(`.${section}-hover-gradient`, {
            opacity: 0.8,
            scale: 1.5,
            duration: 1,
            stagger: 0.1,
            backgroundColor: color,
            ease: "power2.out",
          });
          gsap.to(`.${section === "left" ? "right" : "left"}-hover-gradient`, {
            opacity: 0,
            duration: 0.3,
          });
        } else {
          // Reset state
          gsap.to([refs.left.current, refs.right.current], {
            backgroundColor: "transparent",
            filter: "brightness(1) blur(0px)",
            scale: 1,
            rotation: 0,
            duration: ANIMATION_CONFIG.hover.duration,
            ease: "power2.inOut",
          });
          gsap.to([".left-hover-gradient", ".right-hover-gradient"], {
            opacity: 0,
            scale: 1,
            duration: ANIMATION_CONFIG.hover.duration,
          });
        }

        gsap.to(refs.title.current, {
          scale: section ? 1.1 : 1,
          duration: ANIMATION_CONFIG.hover.duration,
          ease: ANIMATION_CONFIG.hover.ease,
        });
      });

      return () => ctx.revert();
    },
    [isMobile]
  );

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      gsap.set([refs.left.current, refs.right.current, refs.title.current], {
        willChange: "transform",
        backfaceVisibility: "hidden",
        perspective: 1200,
      });

      tl.fromTo(
        [refs.left.current, refs.right.current],
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.inOut",
        }
      ).fromTo(
        refs.title.current,
        { y: 50, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  // Mouse move effect
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(refs.title.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to([refs.left.current, refs.right.current], {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Blob animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const blobs = document.querySelectorAll(".gradient-blob");

      blobs.forEach((blob, index) => {
        gsap.to(blob, {
          x: `random(${ANIMATION_CONFIG.blob.position.min}, ${ANIMATION_CONFIG.blob.position.max})`,
          y: `random(${ANIMATION_CONFIG.blob.position.min}, ${ANIMATION_CONFIG.blob.position.max})`,
          scale: `random(${ANIMATION_CONFIG.blob.scale.min}, ${ANIMATION_CONFIG.blob.scale.max})`,
          duration: `random(${ANIMATION_CONFIG.blob.duration.min}, ${ANIMATION_CONFIG.blob.duration.max})`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Mobile check
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  return (
    <main
      ref={refs.container}
      className="relative min-h-screen overflow-hidden bg-background will-change-transform md:block flex flex-col"
    >
      <Link
        href="/shop"
        ref={refs.left}
        className={`
          md:absolute relative
          md:inset-0 h-[50vh] md:h-auto
          bg-gradient-to-br from-secondary/95 to-secondary/100 
          transform origin-top-left cursor-pointer
          transition-all duration-500
          hover:shadow-2xl
          will-change-transform
          overflow-hidden
          ${isMobile ? "border-b border-primary/5" : ""}
        `}
        style={{
          clipPath: isMobile ? "none" : "polygon(0 0, 0% 100%, 100% 0)",
          transform: "translateZ(0)",
        }}
        onMouseEnter={() => !isMobile && handleHover("left")}
        onMouseLeave={() => !isMobile && handleHover(null)}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Add gradient blobs inside left section */}
          <div className="gradient-blob absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20 bg-green-400/30 top-[-50px] left-[-50px]" />
          <div className="gradient-blob absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 bg-green-300/30 bottom-[20%] right-[10%]" />
          <div className="left-hover-gradient absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-0 bg-green-500/40 top-[-20%] left-[-10%]" />
          <div className="left-hover-gradient absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-0 bg-emerald-400/30 bottom-[-10%] right-[20%]" />
          <div className="left-hover-gradient absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-0 bg-green-600/40 top-[30%] left-[30%]" />
        </div>
        <div
          className={`
          absolute 
          md:top-1/3 md:left-[12%]
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          md:translate-x-0 md:-translate-y-0
          text-primary 
          transform 
          md:-rotate-3 rotate-0
          text-left
          w-full md:w-auto
          px-8 md:px-0
        `}
        >
          <h2 className="text-5xl md:text-6xl lg:text-8xl mb-6 font-medium tracking-tight">
            Shop Now
          </h2>
          <p className="text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase font-light">
            Explore Collection
          </p>
        </div>
      </Link>

      <Link
        href="https://vkcloud.kz"
        ref={refs.right}
        className={`
          md:absolute relative
          md:inset-0 h-[50vh] md:h-auto
          bg-gradient-to-br from-secondary/90 to-secondary/100 
          transform origin-bottom-right cursor-pointer
          transition-transform duration-300
          hover:shadow-xl
          will-change-transform
          overflow-hidden
        `}
        style={{
          clipPath: isMobile ? "none" : "polygon(100% 100%, 0% 100%, 100% 0)",
          transform: "translateZ(0)",
        }}
        onMouseEnter={() => !isMobile && handleHover("right")}
        onMouseLeave={() => !isMobile && handleHover(null)}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Add gradient blobs inside right section */}
          <div className="gradient-blob absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 bg-purple-400/30 top-[20%] left-[10%]" />
          <div className="gradient-blob absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20 bg-violet-400/30 bottom-[-50px] right-[-50px]" />
          <div className="right-hover-gradient absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-0 bg-purple-500/40 bottom-[-20%] right-[-10%]" />
          <div className="right-hover-gradient absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-0 bg-violet-500/30 top-[-10%] left-[20%]" />
          <div className="right-hover-gradient absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-0 bg-purple-600/40 bottom-[30%] right-[30%]" />
        </div>
        <div
          className={`
          absolute 
          md:bottom-1/3 md:right-[15%]
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          md:translate-x-0 md:-translate-y-0
          text-primary 
          transform 
          md:rotate-6 rotate-0
          text-center md:text-right
          w-full md:w-auto
          px-6 md:px-0
        `}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl mb-4 md:mb-6 font-semibold tracking-tight">
            VK Cloud
          </h2>
          <p className="text-base md:text-lg text-muted-foreground tracking-widest uppercase">
            Professionally Hosted
          </p>
        </div>
      </Link>

      <div
        ref={refs.title}
        className={`
          fixed md:absolute
          top-1/2 left-1/2 
          transform -translate-x-1/2 -translate-y-1/2 
          text-primary z-[3]
          pointer-events-none 
          will-change-transform
          text-center
          mix-blend-difference
          ${isMobile ? "opacity-40" : ""}
        `}
      >
        <h1 className="text-5xl md:text-7xl lg:text-9xl mb-4 font-bold tracking-[-0.02em] leading-none">
          LIMIKO
        </h1>
      </div>
    </main>
  );
}
