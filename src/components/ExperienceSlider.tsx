"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface ExperienceSliderProps {
  images: string[];
  cityLabel: string;
  title: string;
}

export default function ExperienceSlider({ images, cityLabel, title }: ExperienceSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  return (
    <div className="experience-slider-luxury" style={{ position: "relative", width: "100%", height: "100vh", minHeight: "500px", overflow: "hidden" }}>
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="experience-scroll-container"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <style>{`
          .experience-scroll-container::-webkit-scrollbar { display: none; }
          @media (max-width: 768px) {
            .experience-slider-luxury { height: 75vh !important; }
          }
        `}</style>
        {images.map((src, i) => (
          <div 
            key={i} 
            className="experience-slide"
            style={{ 
              flex: "0 0 100%", 
              height: "100%", 
              position: "relative",
              scrollSnapAlign: "start"
            }}
          >
            <Image src={src} alt={`${title} - Slide ${i + 1}`} fill style={{ objectFit: "cover", objectPosition: "center" }} priority={i === 0} sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="video-overlay" style={{ background: "linear-gradient(to top, rgba(5, 5, 5, 0.9) 0%, rgba(5, 5, 5, 0.2) 50%, transparent 100%)", zIndex: 1, position: "absolute", top:0, left:0, right: 0, bottom:0 }} />
          </div>
        ))}
      </div>

      {/* Titolo Sovrapposto */}
      <div className="experience-header-overlay" style={{ position: "absolute", bottom: 100, left: "6vw", right: "6vw", zIndex: 10, pointerEvents: "none" }}>
         <span className="label-gold" style={{ display: 'block', marginBottom: '10px' }}>{cityLabel}</span>
         <h1 className="vision-headline" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", margin: "0", color: "white", textShadow: "0 10px 30px rgba(0,0,0,0.5)", pointerEvents: "auto", lineHeight: 1.1 }}>
            {title}
         </h1>
      </div>

      {/* Identificatori dello Slider */}
      {images.length > 1 && (
        <div className="experience-pagination" style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 12,
          zIndex: 20
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`experience-dot ${activeIndex === i ? 'active' : ''}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                background: activeIndex === i ? "#C5A059" : "rgba(255, 255, 255, 0.2)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: activeIndex === i ? "scale(1.2)" : "scale(1)"
              }}
              aria-label={`Vai alla slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
