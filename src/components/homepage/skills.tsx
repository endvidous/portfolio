import React, { useEffect, useState } from "react";
import {
  React_Icon,
  CSharp_Icon,
  C_Icon,
  Cpp_Icon,
  GitHub_Icon,
  Git_Icon,
  JavaScript_Icon,
  Java_Icon,
  MongoDB_Icon,
  MySQL_Icon,
  Postgres_Icon,
  Python_Icon,
  TypeScript_Icon,
  Vue_Icon,
  Express_Icon,
  NextJs_Icon,
  Tailwind_Icon,
  AWS_Icon,
  GraphQl_Icon,
  FramerMotion_Icon,
  ReactQuery_Icon,
  Axios_Icon,
  NodeJs_Icon,
  Vercel_Icon,
  Postman_Icon,
} from "../../assets/skill_icons";
import WaveTransition from "../../ui/wavetransition";
import { motion, AnimatePresence } from "framer-motion";

// Define the Skill type
interface Skill {
  name: string;
  icon: JSX.Element;
}

// Define the SkillsSet type with typed categories
interface SkillsSet {
  Frontend: Skill[];
  Backend: Skill[];
  Languages: Skill[];
  Other: Skill[];
}

// Define a type for the category keys to make them safe to use as index
type SkillCategory = keyof SkillsSet;

// Define the skills data with proper typing
const skillsSet: SkillsSet = {
  Frontend: [
    { name: "React", icon: <React_Icon /> },
    { name: "Next.Js", icon: <NextJs_Icon /> },
    { name: "Tailwind CSS", icon: <Tailwind_Icon /> },
    { name: "Expo - React Native", icon: <React_Icon /> },
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

const Skills: React.FC = () => {
  const categories = Object.keys(skillsSet) as SkillCategory[];
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>("Frontend");
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotate categories every 2 seconds
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveCategory((current) => {
        const currentIndex = categories.indexOf(current);
        return categories[(currentIndex + 1) % categories.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [autoRotate, categories]);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.2 },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gray-50 dark:bg-heavyMetal relative pb-12">
      <WaveTransition position="top" />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>

        {/* Compact category selector */}
        <motion.div
          className="flex justify-center gap-2 mb-6 relative"
          onHoverStart={() => setAutoRotate(false)}
          onHoverEnd={() => setAutoRotate(true)}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative px-3 py-1 text-[1.05rem] md:text-xl lg:text-2xl font-medium text-chalkWhite"
            >
              {activeCategory === category && (
                <motion.div
                  className="absolute inset-0 bg-skin/20 rounded-md"
                  transition={{ type: "spring", stiffness: 300, damping: 40 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>

        {/* Compact skills grid */}
        <div className="max-w-[85%] mx-auto min-h-[12rem]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              variants={categoryVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onHoverStart={() => setAutoRotate(false)}
              onHoverEnd={() => setAutoRotate(true)}
              className="grid grid-cols-4 sm:grid-cols-5 gap-3"
            >
              {skillsSet[activeCategory].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-white/60  dark:border-gray-700/50 hover:shadow-pearlBush transition-all duration-300"
                >
                  <div className="w-8 h-8 mb-1 opacity-80 hover:opacity-100 transition-opacity">
                    {skill.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`w-4 h-2 rounded-full transition-colors ${
                activeCategory === category
                  ? "bg-skin"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
