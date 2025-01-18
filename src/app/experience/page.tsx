import Header from '../components/Header';
import { FaBriefcase, FaLaptopCode } from "react-icons/fa";
import experiences from "../../config/experiences.json";

export default function Experience() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-white">
      <Header />
      <h1 className="text-3xl font-bold text-center mb-8">Experience</h1>
      <div className="relative space-y-16">
        {experiences.map((exp, index) => {
          const Icon = exp.icon === "FaBriefcase" ? FaBriefcase : FaLaptopCode;

          return (
            <div key={index} className="relative">
              <div className="absolute -left-8 top-1 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg z-10">
                <Icon />
              </div>
              {index !== experiences.length && (
                <div className="absolute -left-2 top-7 h-full w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
              )}
              <div className="ml-8 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                <span className="text-gray-500 text-sm">{exp.date}</span>
              </div>
              <p className="text-gray-400 mb-4 italic ml-8">{exp.company}</p>
              <ul className="list-disc list-inside text-gray-400 space-y-3 ml-8">
                {exp.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-sm">{point}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4 ml-8">
                {exp.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
