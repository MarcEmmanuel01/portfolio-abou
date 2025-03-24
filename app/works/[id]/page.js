"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function WorkDetail() {
  const { id } = useParams();

  const works = {
    "osep-statistician": {
      title: "Statistician / Data Analyst – OSEP",
      subtitle: "Public Service Observatory (OSEP) | 3-Month Internship (2024) | Abidjan, Cocody",
      description:
        "Designed the analysis plan, reporting framework, and questionnaires for the National Survey on Public Service Quality (ENQSP). Conducted data analysis and visualization of survey results.",
      companyInfo:
        "The Public Service Observatory (OSEP) is an organization dedicated to improving public service delivery in Côte d'Ivoire by collecting and analyzing data on service quality. It collaborates with government entities to provide actionable insights for policy-making.",
      tasks: [
        "Developed the analysis plan and reporting framework for the ENQSP.",
        "Designed and tested survey questionnaires to ensure data accuracy.",
        "Performed statistical analysis using R to identify trends and patterns.",
        "Created data visualizations (charts, dashboards) to present findings to stakeholders.",
      ],
      tags: ["Survey Design", "Data Analysis", "R", "ENQSP"],
      images: ["/works/osep1.png", "/works/osep2.png"],
    },
  };

  const work = works[id];

  if (!work) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">🚫 Work Not Found</h1>
        <Link href="/" className="text-indigo-400 hover:underline">
          ← Go Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 py-20 relative overflow-hidden">
      {/* Fond animé */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          {/* Retour */}
          <motion.div variants={fadeInUp}>
            <Link href="/" className="text-indigo-500 hover:underline mb-8 inline-block flex items-center">
              ← Back to Home
            </Link>
          </motion.div>

          {/* Titre */}
          <motion.h1 className="text-4xl md:text-5xl font-bold text-white mb-4" variants={fadeInUp}>
            {work.title}
          </motion.h1>
          <motion.p className="text-xl text-gray-400 mb-6" variants={fadeInUp}>
            {work.subtitle}
          </motion.p>

          {/* Images en grid */}
          {work.images && work.images.length > 0 && (
            <motion.div
              className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12"
              variants={fadeInUp}
            >
              {work.images.map((imgSrc, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-lg border border-gray-800"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={imgSrc}
                    alt={`Project screenshot ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Description */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Overview</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{work.description}</p>
          </motion.div>

          {/* À propos */}
          <motion.div variants={fadeInUp} className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">About OSEP</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{work.companyInfo}</p>
          </motion.div>

          {/* Tâches */}
          <motion.div variants={fadeInUp} className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Tasks Performed</h2>
            <ul className="space-y-3">
              {work.tasks.map((task, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-3 mt-2" />
                  <span className="text-gray-300">{task}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeInUp} className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm border border-gray-700"
                  whileHover={{ scale: 1.1, backgroundColor: "#4B5EAA" }}
                  transition={{ duration: 0.3 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
