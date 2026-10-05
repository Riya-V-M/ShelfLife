import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ normalizedX: 0, normalizedY: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const normalizedX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ normalizedX, normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      setSmoothPos((prev) => ({
        x: lerp(prev.x, mousePos.normalizedX, 0.035),
        y: lerp(prev.y, mousePos.normalizedY, 0.035),
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[88vh] w-full bg-[#1b2214] text-[#faf8f0] overflow-hidden flex items-center justify-center px-6 md:px-12 py-16 select-none"
    >
      {/* Muted Ambient Light Glow */}
      <div 
        className="pointer-events-none absolute w-[650px] h-[650px] rounded-full bg-[#46562d]/25 blur-[150px] transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${smoothPos.x * 35}px, ${smoothPos.y * 35}px)`,
          left: 'calc(50% - 325px)',
          top: 'calc(50% - 325px)',
        }}
      />

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#f9e6ac_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT FLANK: Borderless Floating Produce */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-between h-[380px]">
          <div 
            className="flex items-center gap-3 transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${smoothPos.x * -22}px, ${smoothPos.y * -22}px, 0px)`,
            }}
          >
            <div className="relative w-24 h-24 flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=300&q=80" 
                alt="Fresh Avocado" 
                className="w-full h-full object-cover rounded-full shadow-[0_12px_25px_rgba(0,0,0,0.5)] border border-[#f9e6ac]/20"
              />
            </div>
            <div>
              <p className="text-xs font-serif font-bold text-[#faf8f0]">Organic Avocados</p>
              <p className="text-[10px] text-[#f9e6ac]/60">Rescued 1h ago</p>
            </div>
          </div>

          <div 
            className="flex items-center gap-3 ml-8 transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${smoothPos.x * -14}px, ${smoothPos.y * -14}px, 0px)`,
            }}
          >
            <div className="relative w-28 h-28 flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80" 
                alt="Vine Tomatoes" 
                className="w-full h-full object-cover rounded-full shadow-[0_12px_25px_rgba(0,0,0,0.5)] border border-[#f9e6ac]/20"
              />
            </div>
            <div>
              <p className="text-xs font-serif font-bold text-[#faf8f0]">Heirloom Tomatoes</p>
              <p className="text-[10px] text-[#f9e6ac]/60">55% off retail</p>
            </div>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div 
          className="lg:col-span-6 text-center flex flex-col items-center transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${smoothPos.x * 12}px, ${smoothPos.y * 12}px, 0px)`,
          }}
        >
          {/* Tag Badge */}
          <div className="inline-flex items-center gap-2 bg-[#2a341e] border border-[#f9e6ac]/15 text-[#f9e6ac] text-xs font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#c87a32]" />
            <span>Sustainable Surplus Network</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none text-[#faf8f0] font-sans">
            Shelf<span className="text-[#c87a32]">Life</span>
          </h1>

          {/* BIGGER, EDGY & BUBBLY SUBTITLE */}
          <p className="mt-8 text-xl md:text-3xl font-black text-[#faf8f0] max-w-2xl leading-tight tracking-tight uppercase drop-shadow-md">
            Connecting local organic farms with households to deliver{' '}
            <span className="text-[#ff9035] bg-[#322312] px-3 py-1 rounded-2xl inline-block rotate-[-1deg] border border-[#ff9035]/30">
              farm-fresh produce crates
            </span>{' '}
            before they go to waste! 🥦✨
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
            <button className="bg-[#c87a32] hover:bg-[#b56b27] text-[#faf8f0] font-black text-base px-8 py-4 rounded-2xl shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2">
              <span>Browse Today's Crates</span>
              <span className="text-lg">→</span>
            </button>

            <button className="bg-[#28321d] hover:bg-[#323e25] border border-[#f9e6ac]/20 text-[#f9e6ac] font-bold text-base px-8 py-4 rounded-2xl shadow-md transition-all duration-200 hover:scale-105">
              Vendor Partnerships
            </button>
          </div>
        </div>

        {/* RIGHT FLANK: Borderless Floating Produce */}
        <div className="hidden lg:flex lg:col-span-3 flex-col justify-between h-[380px]">
          <div 
            className="flex items-center gap-3 transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${smoothPos.x * 22}px, ${smoothPos.y * 22}px, 0px)`,
            }}
          >
            <div>
              <p className="text-xs font-serif font-bold text-[#faf8f0] text-right">Citrus Harvest</p>
              <p className="text-[10px] text-[#f9e6ac]/60 text-right">Direct farm gate</p>
            </div>
            <div className="relative w-24 h-24 flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80" 
                alt="Citrus Harvest" 
                className="w-full h-full object-cover rounded-full shadow-[0_12px_25px_rgba(0,0,0,0.5)] border border-[#f9e6ac]/20"
              />
            </div>
          </div>

          <div 
            className="flex items-center gap-3 -ml-4 transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${smoothPos.x * 14}px, ${smoothPos.y * 14}px, 0px)`,
            }}
          >
            <div>
              <p className="text-xs font-serif font-bold text-[#faf8f0] text-right">Organic Greens</p>
              <p className="text-[10px] text-[#f9e6ac]/60 text-right">Harvested today</p>
            </div>
            <div className="relative w-28 h-28 flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80" 
                alt="Fresh Greens" 
                className="w-full h-full object-cover rounded-full shadow-[0_12px_25px_rgba(0,0,0,0.5)] border border-[#f9e6ac]/20"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
