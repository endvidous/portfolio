import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "framer-motion";
import { PiGithubLogoBold, PiLinkBold, PiX } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { generateProjectImagePaths } from "../../utils/image";

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageCount: number;
  githubUrl: string | null;
  projectUrl: string;
};

export type ProjectProps = {
  projects: Project[];
};

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors"
    whileHover={{ scale: 1.05 }}
    aria-label={ariaLabel}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="text-xl" />
    <span className="text-sm">
      {ariaLabel.includes("GitHub") ? "Source Code" : "Live Demo"}
    </span>
  </motion.a>
);

const ProjectCard = ({ project }: { project: Project; index?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Images = generateProjectImagePaths(
    project.imageUrl,
    project.imageCount
  );

  return (
    <>
      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="group cursor-pointer rounded-lg bg-neutral-800 overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={Images[0]}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              View Details
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-sm line-clamp-2 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-neutral-700"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-full bg-neutral-700">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />

        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-3xl rounded-xl bg-neutral-900 overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-label="Close"
            >
              <PiX className="text-xl" />
            </button>

            <div className="flex flex-col gap-6 p-6">
              {/* Image Carousel Top */}
              <div className="relative h-96">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation
                  pagination={{ clickable: true, type: "progressbar" }}
                  className="h-full rounded-lg overflow-hidden 
                  [--swiper-navigation-color:#464646] 
    [--swiper-pagination-color:#464646]
    [--swiper-pagination-bullet-size:8px]
    [--swiper-pagination-progressbar-bg-color:#e7e7e7]"
                  autoHeight={true}
                  loop={true}
                >
                  {Images.map((image, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Content Bottom */}
              <div className="flex flex-col gap-4">
                <DialogTitle className="text-3xl font-bold">
                  {project.title}
                </DialogTitle>

                <p className="text-neutral-300 text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-full bg-neutral-800 border border-neutral-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-4 flex-wrap">
                  {project?.githubUrl && (
                    <ProjectLink
                      href={project.githubUrl}
                      icon={PiGithubLogoBold}
                      ariaLabel={`View ${project.title} source code on GitHub`}
                    />
                  )}
                  {project?.projectUrl && (
                    <ProjectLink
                      href={project.projectUrl}
                      icon={PiLinkBold}
                      ariaLabel={`Visit ${project.title} live project`}
                    />
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="py-16 px-4 xl:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r to-sky-400 from-emerald-400 bg-clip-text text-transparent">
          Projects
        </span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
