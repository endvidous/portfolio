import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import {
  PiGithubLogoBold,
  PiLinkedinLogoBold,
  PiEnvelopeBold,
  PiArrowDownBold,
} from "react-icons/pi";

const FIRST = "HENRY";
const LAST = "PUNNOOSE";
const FULL_LEN = FIRST.length + LAST.length;

const SpinningBadge = () => (
  <div className="relative w-24 h-24 md:w-28 md:h-28 select-none">
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path
            id="badge-circle"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            fill="none"
          />
        </defs>
        <text
          fontSize="8.8"
          fill="#697565"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="500"
          letterSpacing="2.5"
        >
          <textPath href="#badge-circle">{`OPEN TO WORK · BANGALORE · ${new Date().getFullYear()} ·`}</textPath>
        </text>
      </svg>
    </motion.div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-skin/25 flex items-center justify-center">
        <span className="text-skin text-base leading-none">↗</span>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const firstNameDisplay = useTransform(rounded, (n) =>
    FIRST.slice(0, Math.min(n, FIRST.length)),
  );
  const lastNameDisplay = useTransform(rounded, (n) =>
    n > FIRST.length ? LAST.slice(0, n - FIRST.length) : "",
  );

  useEffect(() => {
    const controls = animate(count, FULL_LEN, {
      type: "keyframes",
      duration: 1.8,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <div className="relative flex flex-col w-full min-h-[100dvh] justify-center pt-24 pb-16 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background word */}
      <div
        className="absolute inset-0 flex items-center pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black tracking-tighter text-skin select-none whitespace-nowrap"
          style={{ fontSize: "22vw", opacity: 0.028, lineHeight: 1 }}
        >
          BUILD
        </span>
      </div>

      {/* Spinning badge — top right */}
      <motion.div
        className="absolute top-24 right-6 md:top-28 md:right-10"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      >
        <SpinningBadge />
      </motion.div>

      {/* Name */}
      <div className="flex flex-col gap-0 leading-none">
        <motion.span className="font-black text-[13vw] md:text-[11vw] lg:text-[9vw] text-skin tracking-tighter block">
          {firstNameDisplay}
        </motion.span>
        <motion.span className="font-black text-[13vw] md:text-[11vw] lg:text-[9vw] text-skin tracking-tighter block">
          {lastNameDisplay}
        </motion.span>
      </div>

      {/* Animated rule */}
      <motion.div
        className="h-[3px] bg-brick my-6 md:my-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.32, 0.72, 0, 1] }}
        style={{ transformOrigin: "left" }}
      />

      {/* Subtitle row */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 2.3, ease: [0.32, 0.72, 0, 1] }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-lightSeaGreen animate-pulse" />
            <span className="text-lightSeaGreen text-xs font-medium tracking-widest uppercase">
              Available for opportunities
            </span>
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-chalkWhite leading-snug max-w-xl">
            Front-End Engineer &amp; Creative Problem Solver
          </p>
          <p className="text-lightOlive mt-2 text-sm md:text-base tracking-wide">
            Based in Bangalore, India
          </p>
        </div>

        <div className="flex items-center gap-6">
          {[
            {
              href: "https://www.github.com/endvidous",
              icon: <PiGithubLogoBold />,
              label: "GitHub",
            },
            {
              href: "https://www.linkedin.com/in/henry-punnoose/",
              icon: <PiLinkedinLogoBold />,
              label: "LinkedIn",
            },
            {
              href: "mailto:henrypunnoose@gmail.com",
              icon: <PiEnvelopeBold />,
              label: "Email",
            },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex flex-col items-center gap-1 text-chalkgrey hover:text-skin transition-colors"
            >
              <span className="text-2xl md:text-3xl">{icon}</span>
              <span className="text-[10px] uppercase tracking-widest font-medium">
                {label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() =>
          document
            .querySelector("#about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-lightOlive hover:text-skin transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <PiArrowDownBold className="text-xl" />
        </motion.div>
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.button>
    </div>
  );
};

export default Hero;
