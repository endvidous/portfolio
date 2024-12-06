import { motion } from "framer-motion";
import { PiGithubLogoBold, PiLinkBold } from "react-icons/pi";
import WaveTransition from "../../ui/wavetransition";
import { generateProjectImagePaths } from "../../utils/image";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageCount: number;
  githubUrl: string | null;
  projectUrl: string;
}

interface ProjectProps {
  projects: Project[];
}

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
    className={`cursor-pointer text-2xl border-[1px] px-20 md:px-28 lg:px-8 py-4 rounded-md bg-neutral-700 ${
      Icon === PiGithubLogoBold
        ? `hover:text-red-400`
        : `hover:text-lightSeaGreen`
    } transition-colors hover:bg-neutral-500 duration-200`}
    whileHover={{ scale: 1.1 }}
    aria-label={ariaLabel}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon />
  </motion.a>
);

const TechnologyButton = (name: string) => (
  <div className="border-2 border-brick rounded-md bg-chalkblack hover:bg-bulletShell hover:text-lightGrey transition-all ease-in-out duration-300">
    <p className="p-1 text-sm font-semibold">{name}</p>
  </div>
);

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const {
    title,
    description,
    technologies,
    imageUrl,
    imageCount,
    githubUrl,
    projectUrl,
  } = project;

  const Images = generateProjectImagePaths(imageUrl, imageCount);
  return (
    <div className="flex flex-col lg:flex-row gap-2 md:w-[75%] lg:w-full border-2 border-bulletShell rounded-lg bg-lightGrey overflow-hidden">
      <div className="w-full  lg:w-[320px] lg:h-[200px] aspect-video border-bulletShell border-b-2 lg:border-r-2 rounded-md overflow-clip">
        <motion.img
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1, rotate: index % 2 == 0 ? 3 : -3 }}
          transition={{ duration: 0.3, type: "spring" }}
          src={Images[0]}
          alt={`${title} preview`}
        />
      </div>

      <div className="flex flex-col mt-3 p-2 lg:-4">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-base line-clamp-3">{description}</p>
        <div className="mt-4 flex flex-row flex-wrap gap-y-2 gap-x-4 lg:gap-2 ">
          {technologies.map((tech, _) => TechnologyButton(tech))}
        </div>
      </div>
      <div className="flex lg:flex-col justify-evenly lg:ml-auto py-2 lg:px-6 border-t-2 lg:border-l-2 border-bulletShell rounded">
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
  );
};

const Projects = ({ projects }: ProjectProps) => {
  return (
    <section className="w-full">
      <div className="flex flex-col flex-wrap justify-center py-16 px-4 xl:px-8  xl:max-w-[75%] lg:mx-auto ">
        <h1 className="text-4xl text-center mb-12 font-semibold">
          <span className="border-b-4 border-skin pb-2">Projects</span>
        </h1>
        <div className="flex flex-col gap-4 flex-wrap items-center">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
