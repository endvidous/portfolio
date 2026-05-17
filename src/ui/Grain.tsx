const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-[9990] select-none" aria-hidden>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.68"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="0.06" />
    </svg>
  </div>
);

export default Grain;
