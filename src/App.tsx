import Contact from "./components/homepage/contact";
import Hero from "./components/homepage/hero";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { projects } from "./assets/projects.json";
function App() {
  return (
    <div
    //   style={
    //     {
    //       "--color": "rgba(114, 114, 114, 0.3)",
    //       backgroundImage: `linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
    // linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent)`,
    //       backgroundSize: "55px 55px",
    //     } as React.CSSProperties & { [key: string]: any }
    //   }
    >
      <Hero />
      <Projects projects={projects} />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
