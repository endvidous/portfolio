import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PiGithubLogoBold, PiLinkedinLogoBold, PiMapPinBold, PiArrowUpRightBold } from "react-icons/pi";
import SectionLabel from "../../ui/SectionLabel";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-6 md:px-10 py-28 md:py-36 max-w-7xl mx-auto border-t border-white/10">
      <SectionLabel eyebrow="Get In Touch" title="Contact" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="flex flex-col gap-12"
      >
        {/* Large headline */}
        <div>
          <p className="text-chalkgrey text-base md:text-lg max-w-xl leading-relaxed mb-8">
            Have a project in mind, a role to fill, or just want to say hi? My inbox is always open.
          </p>

          <motion.a
            href="mailto:henrypunnoose@gmail.com"
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="group inline-flex items-center gap-4"
          >
            <span className="text-skin font-bold text-2xl md:text-3xl lg:text-4xl hover:text-brick transition-colors duration-300 leading-tight break-all md:break-normal">
              henrypunnoose@gmail.com
            </span>
            <span className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brick/10 border border-brick/25 flex items-center justify-center group-hover:bg-brick group-hover:border-brick transition-all duration-300">
              <PiArrowUpRightBold className="text-brick group-hover:text-heavyMetal text-base md:text-lg transition-colors duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
            </span>
          </motion.a>
        </div>

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row gap-8 sm:items-center sm:justify-between pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-lightOlive text-sm">
            <PiMapPinBold className="text-brick shrink-0" />
            <span>Bangalore, India</span>
          </div>

          <div className="flex gap-4">
            {[
              { href: "https://www.github.com/endvidous", icon: <PiGithubLogoBold />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/henry-punnoose/", icon: <PiLinkedinLogoBold />, label: "LinkedIn" },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.07] text-chalkgrey hover:text-skin hover:border-white/15 transition-colors text-sm font-medium"
              >
                <span className="text-lg text-brick">{icon}</span>
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        <p className="text-lightOlive/40 text-xs">
          &copy; {new Date().getFullYear()} Henry Punnoose. Built with React + Tailwind.
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;
