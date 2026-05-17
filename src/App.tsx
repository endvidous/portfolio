import Navbar from "./components/homepage/navbar";
import Hero from "./components/homepage/hero";
import Experience from "./components/homepage/experience";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";
import Contact from "./components/homepage/contact";
import Grain from "./ui/Grain";
import CustomCursor from "./ui/CustomCursor";
import Marquee from "./ui/Marquee";
import { projects } from "./assets/projects.json";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden font-space-grotesk">
      <Grain />
      <CustomCursor />
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <Marquee />
      <section id="about">
        <Experience />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects projects={projects} />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default App;
