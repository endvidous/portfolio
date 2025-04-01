// import Contact from "./components/homepage/contact";
import Hero from "./components/homepage/hero";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { projects } from "./assets/projects.json";
function App() {
  return (
    <div>
      <Hero />
      <Skills />
      <Projects projects={projects} />
      {/* <Contact /> */}
    </div>
  );
}

export default App;
