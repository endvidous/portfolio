import { motion } from "framer-motion";

const ITEMS = [
  "React", "TypeScript", "Next.js", "Node.js", "NestJS",
  "PostgreSQL", "Redis", "AWS S3", "Framer Motion", "Tailwind CSS",
  "React Native", "MongoDB", "GraphQL", "Prisma", "Git",
];

const SEPARATOR = <span className="text-brick mx-1 select-none">◆</span>;

const Strip = () => (
  <span className="flex items-center gap-6 pr-6 shrink-0">
    {ITEMS.map((item) => (
      <span key={item} className="flex items-center gap-6 text-xs font-medium tracking-widest uppercase text-lightOlive/70">
        {item}
        {SEPARATOR}
      </span>
    ))}
  </span>
);

const Marquee = () => (
  <div className="w-full overflow-hidden border-y border-white/[0.07] py-3 bg-darkOlive/30">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
    >
      <Strip />
      <Strip />
    </motion.div>
  </div>
);

export default Marquee;
