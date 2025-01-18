import { FaBriefcase, FaBrain } from "react-icons/fa";
import Header from "../components/Header";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Saarthi.ai, Bangalore",
    date: "June 2023 - Present",
    points: [
      "Created a microservice to establish a robust data pipeline between client databases and our system, automating the extraction, transformation, and loading (ETL) process for seamless integration.",
      "Solely manage, deploy, and troubleshoot all services of Saarthi.ai for Bank of Maharashtra within bank’s infrastructure, automating tasks, diagnosing issues, and communicating resolutions to ensure smooth operations.",
      "Automated the initiation of call campaigns based on the integrated data, improving efficiency and ensuring real-time synchronization for two clients.",
      "Maintained and deployed scalable microservices architecture with Kubernetes, automating tasks using cron jobs.",
      "Implemented new features for WhatsApp and SMS services using Kaleyra API and Engineered WhatsApp/Voice bots.",
      "Collaborated with cross-functional teams to develop and deploy multilingual AI BOTs, reducing the lifecycle of new BOT product.",
    ],
    tech: ["Node.js", "React", "TypeScript", "Kubernetes", "Kaleyra API", "Docker"],
    icon: <FaBriefcase />,
  },
  {
    role: "Data Scientist",
    company: "Indian Sign Language, IIT Jammu",
    date: "Jan 2022 - April 2022",
    points: [
      "Implemented transfer learning with VGG16 Model for Indian Sign Language recognition.",
      "Processed 6000+ images across 83 different sign language words for model training.",
      "Created web and Android applications for universal model accessibility.",
    ],
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask", "Android"],
    icon: <FaBrain />,
  },
];

export default function Experience() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-white">
      <Header />
      <h1 className="text-3xl font-bold text-center mb-8">Experience</h1>
      <div className="relative space-y-16">
  {experiences.map((exp, index) => (
    <div key={index} className="relative">
      {/* Icon */}
      <div className="absolute -left-8 top-1 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg z-10">
        {exp.icon}
      </div>
      {/* Line */}
      {index !== experiences.length - 1 && (
        <div className="absolute -left-2 top-7 h-full w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
      )}
      {/* Role and Date */}
      <div className="ml-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
        <span className="text-gray-500 text-sm">{exp.date}</span>
      </div>
      {/* Company */}
      <p className="text-gray-400 mb-4 italic ml-8">{exp.company}</p>
      {/* Points */}
      <ul className="list-disc list-inside text-gray-400 space-y-3 ml-8">
        {exp.points.map((point, pointIndex) => (
          <li key={pointIndex} className="text-sm">{point}</li>
        ))}
      </ul>
      {/* Tech Stack */}
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
  ))}
</div>


    </main>
  );
}
