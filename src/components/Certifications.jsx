import React from "react";
import { motion } from "framer-motion";
import { FaAward } from "react-icons/fa";

const baseUrl = process.env.PUBLIC_URL || import.meta.env.BASE_URL || "";

const certs = [
  {
    name: "Power BI Workshop - Office Master",
    link: `${baseUrl}/certificates/P.BI.jpg`,
  },
  {
    name: "Programming Fundamentals using Python - Infosys Springboard",
    link: `${baseUrl}/certificates/PYTHON.pdf`,
  },
  {
    name: "Data Analytics Virtual Job Simulation - Deloitte via Forage",
    link: `${baseUrl}/certificates/DELOITTE.pdf`,
  },
  {
    name: "Elements of AI - University of Helsinki & MinnaLearn",
    link: `${baseUrl}/certificates/AI.pdf`,
  },
  {
    name: "Introduction to Artificial Intelligence - Infosys Springboard",
    link: `${baseUrl}/certificates/INTRO_AI.pdf`,
  },
  {
    name: "Internship Completion Certificate - StaxTech",
    link: `${baseUrl}/certificates/STAXTECH.pdf`,
  },
];

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="py-24 px-6 bg-gradient-to-r from-blue-900 via-purple-900 to-teal-800"
    >
      {/* Section Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-center text-white tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Certifications & Achievements
      </motion.h2>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {certs.map((cert, index) => (
          <motion.div
            key={index}
            onClick={() =>
              window.open(cert.link, "_blank", "noopener,noreferrer")
            }
            className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border-l-4 border-teal-400 cursor-pointer flex flex-col items-center justify-center transition-transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="bg-white/20 p-3 rounded-full mb-4">
              <FaAward className="text-teal-400 text-2xl" />
            </div>
            <p className="text-white font-semibold text-center text-lg md:text-xl">
              {cert.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
