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
const Skills = () => {
  return (
    <div className="">
      <h3 className="text-4xl text-center mb-12 font-semibold ">
        <span className="border-b-4 border-skin">Skills</span>
      </h3>
      <div></div>
    </div>
  );
};

export default Skills;
