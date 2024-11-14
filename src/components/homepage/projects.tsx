import { motion, useInView } from "framer-motion";
import { PiGithubLogoBold, PiLinkBold } from "react-icons/pi";
import { useRef } from "react";
import WaveTransition from "../../ui/wavetransition";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string[];
  githubUrl: string | null;
  projectUrl: string;
}

interface ProjectProps {
  projects: Project[];
}

const getGridClass = (index: number) => {
  switch (index) {
    case 0:
      return "md:col-span-6 md:row-span-2";
    case 1:
      return "md:col-span-4 md:row-span-2";
    case 2:
      return "md:col-span-4 md:row-span-2";
    case 3:
      return "md:col-span-6 md:row-span-2";
    default:
      return "md:col-span-4 md:row-span-2";
  }
};

const ProjectLink = ({
  href,
  icon: Icon,
  ariaLabel,
}: {
  href: string;
  icon: typeof PiGithubLogoBold | typeof PiLinkBold;
  ariaLabel: string;
}) => (
  <motion.a
    href={href}
    className="cursor-pointer text-2xl hover:text-skin transition-colors duration-200"
    whileHover={{ scale: 1.1 }}
    aria-label={ariaLabel}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon />
  </motion.a>
);
const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-40%",
  });
  const calculateDelay = (index: number) => {
    const val = index + 1;
    return val * 0.4; // 0.15s delay between each card
  };
  const { title, description, technologies, imageUrl, githubUrl, projectUrl } =
    project;
  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: calculateDelay(index) }}
      className={`
        flex flex-col bg-lightGrey border-2 border-brick rounded-lg overflow-hidden
        ${getGridClass(index)}
        h-full w-full shadow-md hover:shadow-lg transition-all duration-300
        transform hover:-translate-y-1
      `}
    >
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md border-b-2 border-dashed border-skin"
          src={imageUrl[0]}
          alt={`${title} preview`}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <h4 className="text-xl font-semibold text-skin mb-2">{title}</h4>
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-700">
              Technologies:
            </span>
            <span className="text-sm italic text-gray-600 ml-1">
              {technologies.join(", ")}
            </span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-2 border-t border-gray-200">
          <h1 className="font-semibold text-xl">Links : </h1>
          {githubUrl && (
            <ProjectLink
              href={githubUrl}
              icon={PiGithubLogoBold}
              ariaLabel={`View ${title} source code on GitHub`}
            />
          )}
          <ProjectLink
            href={projectUrl}
            icon={PiLinkBold}
            ariaLabel={`Visit ${title} live project`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ projects }: ProjectProps) => {
  return (
    <section className="w-full">
      <WaveTransition position="top" className="-mt-1" />
      <div className="py-16 px-4 md:px-8 lg:max-w-[85%] mx-auto">
        <h1 className="text-4xl text-center mb-12 font-semibold">
          <span className="border-b-4 border-skin pb-2">Projects</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 auto-rows-fr">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
