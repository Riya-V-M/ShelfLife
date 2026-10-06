import React, { useState, useRef } from 'react';

export default function HoverBasket() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section className="w-full bg-[#1e2414] py-16 px-6 md:px-12 select-none border-b border-[#f9e6ac]/10 relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff9035]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="bg-[#ff9035] text-[#faf8f0] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md inline-block animate-pulse">
          Interactive Surplus Diagram
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#faf8f0] mt-4 tracking-tight font-serif">
          Inside the Picnic Crate
        </h2>
        <p className="text-[#f9e6ac]/80 text-sm md:text-base mt-2">
          Hover your cursor over the woven wicker lid to reveal the fresh organic harvest inside.
        </p>
      </div>

      {/* HORIZONTAL DIAGRAM GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Callout Boxes */}
        <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
          <div className="bg-[#2d351e]/90 border-2 border-dashed border-[#f9e6ac]/30 p-5 rounded-2xl relative shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9035]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl animate-bounce">⚡</span>
              <h3 className="text-[#faf8f0] font-bold text-base font-serif">3-Hour Farm Express</h3>
            </div>
            <p className="text-[#f9e6ac]/80 text-xs leading-relaxed">
              Rescued directly from local organic farm gates within hours of harvest before shelf sorting.
            </p>
          </div>

          <div className="bg-[#2d351e]/90 border-2 border-dashed border-[#f9e6ac]/30 p-5 rounded-2xl relative shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9035]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🥑</span>
              <h3 className="text-[#faf8f0] font-bold text-base font-serif">Perfectly Imperfect</h3>
            </div>
            <p className="text-[#f9e6ac]/80 text-xs leading-relaxed">
              30%+ of fresh fruit is rejected by retailers purely for cosmetic shape or sizing variations.
            </p>
          </div>
        </div>

        {/* Center Container: Self-Contained Wicker Basket Lid */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full h-[380px] md:h-[440px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-4 border-[#8B5A2B] cursor-crosshair group transition-transform duration-500 hover:scale-[1.01] bg-[#2d1b0e]"
          >
            {/* BASE LAYER: Pure SVG Woven Picnic Basket Lid */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#5c3a21]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="basketWeave" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill="#6d4327" />
                    <rect x="0" y="0" width="18" height="18" fill="#8b522b" rx="2" />
                    <rect x="20" y="20" width="18" height="18" fill="#8b522b" rx="2" />
                    <rect x="20" y="0" width="18" height="18" fill="#54331d" rx="2" />
                    <rect x="0" y="20" width="18" height="18" fill="#54331d" rx="2" />
                    <line x1="0" y1="0" x2="40" y2="40" stroke="#3b2313" strokeWidth="1" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#basketWeave)" />
              </svg>

              {/* Decorative Straps & Handle */}
              <div className="absolute inset-[30px] border-4 border-dashed border-[#3b2313]/50 rounded-2xl pointer-events-none" />
              <div className="absolute w-24 h-6 bg-[#3b2313] rounded-full top-8 shadow-lg border border-[#8b522b] pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6 pointer-events-none">
                <span className="self-start bg-[#8B5A2B] text-[#f9e6ac] text-[11px] font-bold px-3 py-1 rounded-full border border-[#f9e6ac]/20 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  🧺 Woven Picnic Lid
                </span>
                <p className="text-[#f9e6ac] text-xs text-center font-serif tracking-wide bg-black/70 py-2.5 px-4 rounded-xl backdrop-blur-sm border border-[#f9e6ac]/20 shadow-lg">
                  ✨ [ Hover cursor over lid to reveal organic produce inside ]
                </p>
              </div>
            </div>

            {/* HOVER LAYER: Organic Produce */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                opacity: isHovered ? 1 : 0,
                clipPath: isHovered
                  ? `circle(130px at ${mousePos.x}% ${mousePos.y}%)`
                  : 'circle(0px at 50% 50%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80"
                alt="Fresh Produce Harvest Inside Crate"
                className="w-full h-full object-cover scale-105"
              />
            </div>

            {/* Hover Lens (No lag / locked to cursor) */}
            {isHovered && (
              <div
                className="absolute w-[260px] h-[260px] border-2 border-[#ff9035] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_35px_rgba(255,144,53,0.6)] flex items-center justify-center z-30"
                style={{
                  left: `${mousePos.x}%`,
                  top: `${mousePos.y}%`,
                }}
              >
                <span className="absolute -top-8 bg-[#ff9035] text-[#faf8f0] text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-widest whitespace-nowrap animate-pulse">
                  Fresh Produce 🥗
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Callout Boxes */}
        <div className="lg:col-span-3 flex flex-col gap-6 order-3">
          <div className="bg-[#2d351e]/90 border-2 border-dashed border-[#f9e6ac]/30 p-5 rounded-2xl relative shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9035]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌱</span>
              <h3 className="text-[#faf8f0] font-bold text-base font-serif">Zero-Waste Goal</h3>
            </div>
            <p className="text-[#f9e6ac]/80 text-xs leading-relaxed">
              Every rescued basket saves roughly 4kg of CO₂ equivalents from entering our atmosphere.
            </p>
          </div>

          <div className="bg-[#2d351e]/90 border-2 border-dashed border-[#f9e6ac]/30 p-5 rounded-2xl relative shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff9035]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏷</span>
              <h3 className="text-[#faf8f0] font-bold text-base font-serif">Up to 70% Off</h3>
            </div>
            <p className="text-[#f9e6ac]/80 text-xs leading-relaxed">
              High quality surplus produce offered at steep discounts for hyper-local pickup.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
