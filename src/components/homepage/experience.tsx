import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience as experienceData } from "../../assets/experience.json";
import SectionLabel from "../../ui/SectionLabel";

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

const TimelineEntry = ({ entry, index }: { entry: ExperienceEntry; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.32, 0.72, 0, 1] }}
      className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-10 border-t border-white/10 first:border-t-0"
    >
      <div className="flex flex-col gap-1">
        <span className="text-lightOlive text-sm font-medium tracking-wide">{entry.period}</span>
        <span className="text-chalkgrey text-sm">{entry.location}</span>
        <span className="text-brick font-semibold text-base mt-2">{entry.company}</span>
      </div>

      <div>
        <h3 className="text-skin font-bold text-xl md:text-2xl mb-5">{entry.role}</h3>
        <ul className="flex flex-col gap-3">
          {entry.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-chalkgrey text-sm md:text-base leading-relaxed">
              <span className="text-brick mt-1.5 shrink-0 font-bold">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => (
  <section className="px-6 md:px-10 py-28 md:py-36 max-w-7xl mx-auto border-t border-white/10">
    <SectionLabel eyebrow="Work History" title="Experience" />
    <div>
      {(experienceData as ExperienceEntry[]).map((entry, index) => (
        <TimelineEntry key={entry.company + index} entry={entry} index={index} />
      ))}
    </div>
  </section>
);

export default Experience;
