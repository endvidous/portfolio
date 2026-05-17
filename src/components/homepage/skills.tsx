import React, { useEffect, useState } from "react";
import {
  React_Icon, CSharp_Icon, C_Icon, Cpp_Icon, GitHub_Icon, Git_Icon,
  JavaScript_Icon, Java_Icon, MongoDB_Icon, MySQL_Icon, Postgres_Icon,
  Python_Icon, TypeScript_Icon, Vue_Icon, Express_Icon, NextJs_Icon,
  Tailwind_Icon, AWS_Icon, GraphQl_Icon, FramerMotion_Icon, ReactQuery_Icon,
  Axios_Icon, NodeJs_Icon, Vercel_Icon, Postman_Icon,
} from "../../assets/skill_icons";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../../ui/SectionLabel";

interface Skill { name: string; icon: JSX.Element; }
interface SkillsSet { Frontend: Skill[]; Backend: Skill[]; Languages: Skill[]; Other: Skill[]; }
type SkillCategory = keyof SkillsSet;

const skillsSet: SkillsSet = {
  Frontend: [
    { name: "React", icon: <React_Icon /> },
    { name: "Next.Js", icon: <NextJs_Icon /> },
    { name: "Tailwind CSS", icon: <Tailwind_Icon /> },
    { name: "Expo / React Native", icon: <React_Icon /> },
    { name: "Vue.Js", icon: <Vue_Icon /> },
    { name: "Framer Motion", icon: <FramerMotion_Icon /> },
    { name: "React Query", icon: <ReactQuery_Icon /> },
    { name: "Axios", icon: <Axios_Icon /> },
  ],
  Backend: [
    { name: "Node.js", icon: <NodeJs_Icon /> },
    { name: "Express", icon: <Express_Icon /> },
    { name: "MongoDB", icon: <MongoDB_Icon /> },
    { name: "PostgreSQL", icon: <Postgres_Icon /> },
    { name: "GraphQL", icon: <GraphQl_Icon /> },
    { name: "MySQL", icon: <MySQL_Icon /> },
  ],
  Languages: [
    { name: "TypeScript", icon: <TypeScript_Icon /> },
    { name: "JavaScript", icon: <JavaScript_Icon /> },
    { name: "Java", icon: <Java_Icon /> },
    { name: "Python", icon: <Python_Icon /> },
    { name: "C", icon: <C_Icon /> },
    { name: "C++", icon: <Cpp_Icon /> },
    { name: "C#", icon: <CSharp_Icon /> },
  ],
  Other: [
    { name: "Git", icon: <Git_Icon /> },
    { name: "GitHub", icon: <GitHub_Icon /> },
    { name: "AWS", icon: <AWS_Icon /> },
    { name: "Vercel", icon: <Vercel_Icon /> },
    { name: "Postman", icon: <Postman_Icon /> },
  ],
};

const categories = Object.keys(skillsSet) as SkillCategory[];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.5, filter: "blur(4px)" },
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Frontend");
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveCategory((current) => {
        const i = categories.indexOf(current);
        return categories[(i + 1) % categories.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  return (
    <section className="px-6 md:px-10 py-28 md:py-36 max-w-7xl mx-auto border-t border-white/10">
      <SectionLabel eyebrow="Tech Stack" title="Skills" />

      <div onMouseEnter={() => setAutoRotate(false)} onMouseLeave={() => setAutoRotate(true)}>
        <div className="flex gap-6 md:gap-8 mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative text-base md:text-lg font-semibold transition-colors pb-1 ${
                activeCategory === category ? "text-skin" : "text-lightOlive hover:text-chalkgrey"
              }`}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brick"
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[14rem]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4"
            >
              {skillsSet[activeCategory].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ delay: index * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                  className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-1.5"
                >
                  <div className="group flex flex-col items-center p-3 rounded-[calc(0.75rem-0.375rem)] bg-lightGrey/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-lightGrey/35 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 cursor-default">
                    <div className="w-8 h-8 mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] md:text-xs font-medium text-chalkgrey group-hover:text-pearlBush transition-colors text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCategory === category ? "bg-brick w-6" : "bg-lightOlive/40 w-4 hover:bg-lightOlive/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
