import WaveTransition from "../../ui/wavetransition";

const skillsSet = {
  frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  backend: ["Node.js", "Express.js"],
  databases: ["MongoDB", "MySQL", "PostgreSQL"],
  devOps: ["Docker", "AWS", "GitHub Actions"],
  versionControl: ["Git", "GitHub"],
  programmingLanguages: [
    "JavaScript",
    "Typescript",
    "Python",
    "Java",
    "C",
    "C++",
  ],
  tools: ["VS Code", "Webpack", "ESLint"],
};

const skillSet = (category: string, skills: string[]) => {
  return (
    <div className="flex flex-row gap-2">
      <h3>{category}</h3>
      <div className="flex gap-1">
        {skills.map((skill, index) => (
          <h4 key={index}>{skill}</h4>
        ))}
      </div>
    </div>
  );
};
const Skills = () => {
  return (
    <section className="">
      <WaveTransition position="top" className="-mt-1" />
      <div>
        <h3 className="text-4xl text-center mb-12 font-semibold ">
          <span className="border-b-4 border-skin">Skills</span>
        </h3>
        <div>
          {Object.entries(skillsSet).map(([category, skills]) =>
            skillSet(category, skills)
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
