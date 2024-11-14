import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Cursor from "../../ui/cursor";
import { useEffect } from "react";
import { PiGithubLogoBold, PiLinkedinLogoBold } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import WaveTransition from "../../ui/wavetransition";

const Hero = () => {
  const baseText = "Henry Punnoose " as string;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "keyframes",
      duration: 2,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);
  return (
    <div className="flex flex-col w-full min-h-[90dvh] lg:min-h-screen align-middle justify-center">
      <div className="flex flex-col flex-grow lg:w-[70%] mx-auto lg:mt-32 text-skin justify-center align-middle">
        <span className="font-semibold text-4xl h-[2.5rem] md:text-6xl md:h-[3rem] mb-5 text-center">
          <span className="">{`>`} </span>
          <motion.span className="">{displayText}</motion.span>
          <Cursor />
        </span>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1 }}
          className="text-sm md:text-xl  text-pretty text-center mt-4"
        >
          A software developer based in India, loves solving problems and
          enhancing UI/UX. I specialize in front-end engineering and enjoy doing
          leetcode, hackerRank problems ⚙️, gaming 🎮, playing D&D 🐉, and
          watching movies 🎬 in my free time.
        </motion.p>
        <motion.div
          className="mt-8 mx-auto w-[60%] flex justify-evenly  text-2xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.a
            whileHover={{ scale: 1.2, transition: { duration: 0.8 } }}
            href="https://www.github.com/endvidous"
          >
            <PiGithubLogoBold />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, transition: { duration: 0.8 } }}
            href="https://www.linkedin.com/henry-punnoose"
          >
            <PiLinkedinLogoBold />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, transition: { duration: 0.8 } }}
            href="mailto:henrypunnoose@gmail.com"
          >
            <MdOutlineEmail className="font-bold" />
          </motion.a>
        </motion.div>
      </div>
      <WaveTransition />
    </div>
  );
};

export default Hero;
