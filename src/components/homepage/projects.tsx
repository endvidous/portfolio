import { useRef, useMemo, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion, useInView } from "framer-motion";
import { PiGithubLogoBold, PiLinkBold, PiX, PiArrowSquareOutBold } from "react-icons/pi";
import SectionLabel from "../../ui/SectionLabel";
import useIsMobile from "../../hooks/useIsMobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
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

export type ProjectProps = { projects: Project[] };

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ResponsiveImage = ({ src, alt }: { src: string; alt: string }) => {
  const isMobile = useIsMobile();
  const imgClass = "object-contain max-h-[50vh] w-auto select-none";

  if (isMobile) {
    return (
      <img src={src} alt={alt} className={imgClass} draggable={false}
        style={{ touchAction: "auto", maxWidth: "100%", height: "auto" }} />
    );
  }

  return (
    <TransformWrapper initialScale={1} minScale={1} maxScale={3}
      wheel={{ step: 0.1 }} doubleClick={{ step: 2, mode: "toggle" }}
      centerOnInit limitToBounds smooth>
      {() => (
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%", cursor: "grab" }}
          contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <img src={src} alt={alt} className={imgClass} draggable={false} />
        </TransformComponent>
      )}
    </TransformWrapper>
  );
};

const LinkButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <motion.a
    href={href} target="_blank" rel="noopener noreferrer"
    whileHover={{ scale: 1.04 }}
    className="flex items-center gap-2 px-4 py-2 rounded-md bg-lightGrey/60 hover:bg-brick/20 border border-white/10 hover:border-brick/40 transition-colors text-chalkWhite text-sm font-medium"
  >
    <span className="text-lg">{icon}</span> {label}
  </motion.a>
);

const ProjectModal = ({ project, images, isOpen, onClose }: {
  project: Project;
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const safeTitle = project.title.replace(/\s+/g, "-").toLowerCase();

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <DialogPanel className="relative w-full max-w-3xl max-h-[95vh] flex flex-col rounded-2xl bg-heavyMetal border border-white/10 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-lightGrey/50 hover:bg-lightGrey transition-colors text-pearlBush"
          aria-label="Close"
        >
          <PiX className="text-xl" />
        </button>

        <div className="flex flex-col overflow-y-auto p-6 gap-6">
          <div className="w-full flex justify-center items-center overflow-hidden rounded-xl bg-lightGrey/10 border border-white/5 relative" style={{ maxHeight: "50vh" }}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{ nextEl: `.swiper-next-${safeTitle}`, prevEl: `.swiper-prev-${safeTitle}` }}
              pagination={{ clickable: true, type: "bullets" }}
              loop={images.length > 1}
              autoHeight allowTouchMove touchRatio={1} touchAngle={45}
              simulateTouch touchStartPreventDefault={false}
              threshold={5} shortSwipes longSwipes longSwipesRatio={0.5} longSwipesMs={300}
              className="w-full h-full"
            >
              {images.map((image, idx) => (
                <SwiperSlide key={idx} className="flex items-center justify-center p-2">
                  <ResponsiveImage src={image} alt={`${project.title} screenshot ${idx + 1}`} />
                </SwiperSlide>
              ))}
              {images.length > 1 && (
                <>
                  <div className={`swiper-button-prev swiper-prev-${safeTitle} absolute top-0 left-0 h-full w-1/4 opacity-30 hover:opacity-70 z-40 hidden md:flex`} />
                  <div className={`swiper-button-next swiper-next-${safeTitle} absolute top-0 right-0 h-full w-1/4 opacity-30 hover:opacity-70 z-40 hidden md:flex`} />
                </>
              )}
            </Swiper>
          </div>

          <div>
            <DialogTitle className="text-3xl font-bold text-chalkWhite">{project.title}</DialogTitle>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 text-xs rounded-full bg-brick/15 text-brick border border-brick/20 font-medium">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-3 flex-wrap">
              {project.githubUrl && <LinkButton href={project.githubUrl} icon={<PiGithubLogoBold />} label="Source Code" />}
              {project.projectUrl && <LinkButton href={project.projectUrl} icon={<PiLinkBold />} label="Live Demo" />}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

const ProjectRow = ({ project, cardIndex }: { project: Project; cardIndex: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const images = useMemo(
    () => generateProjectImagePaths(project.imageUrl, project.imageCount),
    [project.imageUrl, project.imageCount]
  );
  const cardNumber = String(cardIndex + 1).padStart(2, "0");

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay: cardIndex * 0.08, ease: [0.32, 0.72, 0, 1] }}
        className="group py-10 md:py-12 border-t border-white/10 first:border-t-0"
      >
        <div className="flex items-center gap-4 mb-5">
          <span className="text-xs font-bold tracking-widest text-lightOlive/50 uppercase">{cardNumber}</span>
          <div className="flex-1 h-px bg-white/10 group-hover:bg-brick/30 transition-colors duration-500" />
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-3xl font-black text-chalkWhite tracking-tight mb-2 group-hover:text-skin transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-chalkgrey text-sm md:text-base leading-relaxed mb-5 max-w-xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs rounded-full bg-brick/10 text-brick border border-brick/20 font-medium">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-lightOlive hover:text-skin transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}>
                  <PiGithubLogoBold className="text-base" /> GitHub
                </a>
              )}
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-lightOlive hover:text-skin transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}>
                  <PiLinkBold className="text-base" /> Live
                </a>
              )}
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group/btn flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-brick/10 border border-brick/25 text-brick hover:bg-brick hover:text-heavyMetal transition-all duration-300 text-sm font-semibold"
              >
                Screenshots
                <span className="w-6 h-6 rounded-full bg-brick/20 group-hover/btn:bg-heavyMetal/20 flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px">
                  <PiArrowSquareOutBold className="text-xs" />
                </span>
              </motion.button>
            </div>
          </div>

          <motion.div
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full md:w-72 lg:w-80 shrink-0 rounded-xl overflow-hidden cursor-pointer relative group/img"
          >
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="relative rounded-[calc(0.75rem-0.375rem)] overflow-hidden aspect-video">
                <img
                  src={images[0]}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-darkOlive/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[calc(0.75rem-0.375rem)]">
                  <span className="text-skin text-xs font-semibold tracking-widest uppercase">View Screenshots</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ProjectModal project={project} images={images} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const Projects = ({ projects }: { projects: Project[] }) => (
  <section className="px-6 md:px-10 py-28 md:py-36 max-w-7xl mx-auto border-t border-white/10">
    <SectionLabel eyebrow="Case Studies" title="Projects" />
    <div>
      {projects.map((project, index) => (
        <ProjectRow key={project.title} project={project} cardIndex={index} />
      ))}
    </div>
  </section>
);

export default Projects;
