import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "framer-motion";
import { PiGithubLogoBold, PiLinkBold, PiX } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { generateProjectImagePaths } from "../../utils/image";

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageCount: number;
  githubUrl: string | null;
  projectUrl: string | null;
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

const ZoomableImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <TransformWrapper
    initialScale={1}
    minScale={1}
    maxScale={3}
    wheel={{ step: 0.1 }}
    pinch={{ step: 5 }}
    doubleClick={{ step: 2, mode: "toggle" }}
    centerOnInit={true}
    limitToBounds={true}
    smooth={true}
    alignmentAnimation={{
      sizeX: 0,
      sizeY: 0,
      velocityAlignmentTime: 200,
    }}
    // Disable panning when not zoomed to prevent conflicts with Swiper
    panning={{ disabled: false, velocityDisabled: true }}
    onPanning={(ref) => {
      // Only allow panning when zoomed in
      if (ref.state.scale <= 1.1) {
        return false;
      }
      return true;
    }}
  >
    {() => (
      <>
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
            cursor: "grab",
          }}
          contentStyle={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={src}
            alt={alt}
            className={`object-contain max-h-[50vh] w-auto select-none ${
              className || ""
            }`}
            draggable={false}
          />
        </TransformComponent>
      </>
    )}
  </TransformWrapper>
);

const ProjectCard = ({ project }: { project: Project; index?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Images = generateProjectImagePaths(
    project.imageUrl,
    project.imageCount
  );
  const safeTitle = project.title.replace(/\s+/g, "-").toLowerCase();

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
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />

        <DialogPanel className="relative w-full max-w-3xl max-h-[95vh] flex flex-col rounded-xl bg-neutral-900 overflow-hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
            aria-label="Close"
          >
            <PiX className="text-xl" />
          </button>

          <div className="flex flex-col overflow-hidden p-6 gap-6">
            {/* Image Carousel */}
            <div
              className="w-full flex justify-center items-center overflow-hidden rounded-lg bg-neutral-900 relative"
              style={{ maxHeight: "50vh" }}
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                  nextEl: `.swiper-button-next-${safeTitle}`,
                  prevEl: `.swiper-button-prev-${safeTitle}`,
                }}
                pagination={{
                  clickable: true,
                  type: "bullets",
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                loop={Images.length > 1}
                autoHeight={true}
                className="w-full h-full transition-all duration-300 ease-in-out relative"
                // Enable touch/swipe on mobile
                allowTouchMove={true}
                // Better touch handling
                touchRatio={1}
                touchAngle={45}
                simulateTouch={true}
                // Prevent conflicts with zoom/pan
                touchStartPreventDefault={false}
                touchMoveStopPropagation={false}
                // Responsive breakpoints
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                }}
                // Sensitivity settings
                threshold={5}
                shortSwipes={true}
                longSwipes={true}
                longSwipesRatio={0.5}
                longSwipesMs={300}
              >
                {Images.map((image, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="flex items-center justify-center bg-neutral-900 p-2 relative"
                  >
                    <ZoomableImage
                      src={image}
                      alt={`${project.title} screenshot ${idx + 1}`}
                    />
                  </SwiperSlide>
                ))}

                {/* Custom navigation - Hide on small screens */}
                {Images.length > 1 && (
                  <>
                    <div
                      className={`swiper-button-prev swiper-button-prev-${safeTitle} absolute top-0 left-0 h-full w-1/4 opacity-30 hover:opacity-60 z-40 items-center justify-start hidden md:flex`}
                    />
                    <div
                      className={`swiper-button-next swiper-button-next-${safeTitle} absolute top-0 right-0 h-full w-1/4 opacity-30 hover:opacity-60 z-40 items-center justify-end hidden md:flex`}
                    />
                  </>
                )}
              </Swiper>
            </div>

            {/* Content */}
            <div>
              <DialogTitle className="text-3xl font-bold">
                {project.title}
              </DialogTitle>
              <p className="text-neutral-300 text-lg mt-2">
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
