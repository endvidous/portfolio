// import Contact from "./components/homepage/contact";
import Hero from "./components/homepage/hero";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { projects } from "./assets/projects.json";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="w-full max-w-full px-3 md:px-0">
        <Hero />
        <Skills />
        <Projects projects={projects} />
        {/* <Contact /> */}
      </div>
    </div>
  );
}
export default App;
