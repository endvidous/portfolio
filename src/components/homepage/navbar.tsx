import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiListBold, PiXBold } from "react-icons/pi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="pointer-events-auto flex items-center gap-2 md:gap-1 pl-5 pr-2 py-2 rounded-full bg-heavyMetal/85 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="text-skin font-black text-lg tracking-tight hover:opacity-75 transition-opacity shrink-0 mr-3 md:mr-5"
          >
            HP.
          </a>

          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                className="px-4 py-1.5 text-chalkgrey hover:text-skin transition-colors duration-200 text-sm font-medium tracking-wide rounded-full hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden w-9 h-9 ml-2 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-pearlBush"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <PiXBold className="text-base" />
                </motion.span>
              ) : (
                <motion.span key="list" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <PiListBold className="text-base" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-heavyMetal/96 backdrop-blur-2xl flex flex-col items-center justify-center gap-2"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="text-5xl font-black text-chalkWhite hover:text-skin transition-colors tracking-tight py-2"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
