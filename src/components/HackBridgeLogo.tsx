import React from 'react';

interface HackBridgeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  subtitle?: string;
  layout?: 'horizontal' | 'stacked';
  variant?: 'default' | 'light';
}

export const HackBridgeLogo: React.FC<HackBridgeLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showTagline = true,
  subtitle,
  layout = 'horizontal',
  variant = 'default',
}) => {
  // Dimensions calibrated for the new 3D arched bridge emblem
  const sizeMap = {
    sm: {
      icon: 32,
      font: 'text-[17px]',
      tagline: 'text-[8.5px]',
      gap: 'gap-2.5',
    },
    md: {
      icon: 42,
      font: 'text-[21px]',
      tagline: 'text-[10px]',
      gap: 'gap-3',
    },
    lg: {
      icon: 56,
      font: 'text-[27px]',
      tagline: 'text-[12px]',
      gap: 'gap-3.5',
    },
    xl: {
      icon: 84,
      font: 'text-[40px]',
      tagline: 'text-[15px]',
      gap: 'gap-4',
    },
  };

  const current = sizeMap[size];

  // The 3D Dimensional H-Bridge SVG Emblem
  const Emblem = (
    <div
      className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.03] select-none"
      style={{ width: current.icon, height: current.icon }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible drop-shadow-[0_2px_6px_rgba(40,24,16,0.18)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Left Pillar Front Shadow */}
          <linearGradient id="leftPillarFront" x1="42" y1="28" x2="68" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c1d17" />
            <stop offset="60%" stopColor="#1e130e" />
            <stop offset="100%" stopColor="#150d09" />
          </linearGradient>

          {/* Left Pillar Inner Facet Highlight */}
          <linearGradient id="leftPillarFacet" x1="68" y1="46" x2="88" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#633e28" />
            <stop offset="45%" stopColor="#482b1a" />
            <stop offset="100%" stopColor="#2c1a0f" />
          </linearGradient>

          {/* Right Pillar Front */}
          <linearGradient id="rightPillarFront" x1="132" y1="28" x2="158" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c1d17" />
            <stop offset="60%" stopColor="#1e130e" />
            <stop offset="100%" stopColor="#150d09" />
          </linearGradient>

          {/* Right Pillar Inner Facet */}
          <linearGradient id="rightPillarFacet" x1="112" y1="46" x2="132" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#633e28" />
            <stop offset="45%" stopColor="#482b1a" />
            <stop offset="100%" stopColor="#2c1a0f" />
          </linearGradient>

          {/* Golden Ribbon Arch - Top Lit Surface */}
          <linearGradient id="ribbonLit" x1="40" y1="120" x2="160" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#b67a48" />
            <stop offset="35%" stopColor="#dba16d" />
            <stop offset="65%" stopColor="#eed0a4" />
            <stop offset="100%" stopColor="#a36637" />
          </linearGradient>

          {/* Ribbon Arch - Underside Shadow */}
          <linearGradient id="ribbonShade" x1="42" y1="140" x2="140" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#552f19" />
            <stop offset="50%" stopColor="#3d1e0d" />
            <stop offset="100%" stopColor="#241106" />
          </linearGradient>

          {/* Four-Pointed Star Glow */}
          <linearGradient id="starGradient" x1="145" y1="10" x2="165" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d89a62" />
            <stop offset="50%" stopColor="#b97843" />
            <stop offset="100%" stopColor="#8d5427" />
          </linearGradient>
        </defs>

        {/* 1. Left 3D Pillar */}
        {/* Left inner facet */}
        <path
          d="M 68,48 L 86,59 L 86,112 L 68,102 Z"
          fill="url(#leftPillarFacet)"
        />
        {/* Left main monolithic pillar */}
        <path
          d="M 42,28 C 42,28 68,44 68,48 L 68,142 C 68,146 42,158 42,158 Z"
          fill="url(#leftPillarFront)"
        />

        {/* 2. Right 3D Pillar */}
        {/* Right inner facet */}
        <path
          d="M 132,48 L 114,59 L 114,112 L 132,102 Z"
          fill="url(#rightPillarFacet)"
        />
        {/* Right main monolithic pillar */}
        <path
          d="M 158,28 C 158,28 132,44 132,48 L 132,142 C 132,146 158,158 158,158 Z"
          fill="url(#rightPillarFront)"
        />

        {/* 3. The Arched Bridge Ribbon (Sweeping 3D Arch connecting the H) */}
        {/* Ribbon underside / dark inner curve */}
        <path
          d="M 42,142 Q 100,54 158,108 C 158,118 148,124 132,112 Q 96,74 42,148 Z"
          fill="url(#ribbonShade)"
        />

        {/* Ribbon top surface with warm copper & golden twist */}
        <path
          d="M 42,135 Q 100,60 158,98 C 158,126 142,154 132,150 Q 94,84 42,135 Z"
          fill="url(#ribbonLit)"
        />

        {/* Highlight sheen along bridge deck ridge */}
        <path
          d="M 44,136 Q 100,64 156,102"
          stroke="#ffeed4"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* 4. Innovation Sparkle / 4-Pointed Star at Top Right */}
        <path
          d="M 163,8 Q 163,22 177,22 Q 163,22 163,36 Q 163,22 149,22 Q 163,22 163,8 Z"
          fill="url(#starGradient)"
        />
      </svg>
    </div>
  );

  return (
    <div
      className={`inline-flex items-center ${current.gap} select-none group cursor-pointer ${
        layout === 'stacked' ? 'flex-col text-center' : ''
      } ${className}`}
    >
      {/* 3D Arched Emblem */}
      {Emblem}

      {/* Typography: "HackBridge" + Tagline "Discover • Build • Grow" */}
      {showText && (
        <div className={`flex flex-col justify-center leading-none ${layout === 'stacked' ? 'items-center mt-2' : ''}`}>
          <div className="flex items-baseline tracking-[-0.03em]">
            <span
              className={`font-[800] ${current.font} ${
                variant === 'light' ? 'text-white' : 'text-[#241a14]'
              }`}
            >
              Hack
            </span>
            <span className={`font-[800] ${current.font} text-[#8b5a2b]`}>
              Bridge
            </span>
          </div>

          {subtitle ? (
            <span
              className={`font-[700] ${current.tagline} tracking-[0.18em] text-[#71594f] uppercase mt-1 leading-none`}
            >
              {subtitle}
            </span>
          ) : showTagline ? (
            <div
              className={`font-semibold ${current.tagline} tracking-[0.18em] text-[#71594f] uppercase mt-1 leading-none flex items-center gap-1.5`}
            >
              <span>Discover</span>
              <span className="text-[7px] text-[#8b5a2b] font-bold">•</span>
              <span>Build</span>
              <span className="text-[7px] text-[#8b5a2b] font-bold">•</span>
              <span>Grow</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
