"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 overflow-hidden">
      {/* Custom cursor follower */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-indigo-600 mix-blend-exclusion pointer-events-none z-50 hidden md:block"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      {/* Glowing orbs background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-80 h-80 bg-indigo-900/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, delay: 4 }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"
        style={{ pointerEvents: "none" }}
      />

      {/* Navigation */}
      <header className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="font-bold text-xl tracking-tight">
                <span className="text-indigo-500">My</span>
                <span className="relative">
                  Portfolio
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </span>
              </Link>
            </motion.div>

            <motion.nav
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {["Welcome", "About me", "Works", "Contact"].map((item, i) => (
                <motion.div key={item} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link
                    href={i === 0 ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className={`font-medium ${i === 0 ? "text-indigo-500" : "hover:text-indigo-500"} transition-colors relative group`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="hidden md:flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                { icon: <Github size={20} />, url: "https://github.com/votre-username" },
                { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/votre-profil" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-500 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden p-4 bg-gray-900 border-t border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="font-medium text-indigo-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Welcome
              </Link>
              <Link
                href="/about-me"
                className="font-medium hover:text-indigo-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About me
              </Link>
              <Link
                href="/works"
                className="font-medium hover:text-indigo-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Works
              </Link>
              <Link
                href="/projects"
                className="font-medium hover:text-indigo-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/skills"
                className="font-medium hover:text-indigo-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Skills
              </Link>
              <Link
                href="/educations"
                className="font-medium hover:text-indigo-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Educations
              </Link>
              <Link
                href="/contact"
                className="font-medium hover:text-indigo-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://github.com/votre-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-500 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/votre-profil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-500 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <motion.section
          className="flex flex-col-reverse lg:flex-row items-center gap-12"
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div className="lg:w-1/2 space-y-8" variants={fadeInUp}>
            <motion.div
              className="inline-block px-3 py-1 bg-indigo-900/30 text-indigo-400 rounded-full text-sm font-medium border border-indigo-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              STUDENT DATA SCIENTIST
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
              variants={fadeInUp}
            >
              Creative. Passionate.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                Computer Engineer.
              </span>
            </motion.h1>
            <motion.p className="text-xl text-gray-400 leading-relaxed" variants={fadeInUp}>
              Welcome, I am{" "}
              <span className="font-semibold text-white">Abou Diakite</span>,
              Student IT professional
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 pt-4" variants={fadeInUp}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-indigo-900/30"
                >
                  See my projects
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-indigo-400 font-medium rounded-lg transition-all duration-300"
                >
                  Contact me
                </Link>
              </motion.div>
            </motion.div>
            <motion.div className="pt-8" variants={fadeInUp}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Technologies I use
              </h2>
              <div className="flex flex-wrap gap-3">
                {["Python", "Django", "React", "Next.js", "Tailwind CSS", "PostgreSQL"].map(
                  (tech) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm border border-gray-700"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#2D3748",
                        borderColor: "#4C1D95",
                        color: "#A78BFA",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {tech}
                    </motion.span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="lg:w-1/2 flex justify-center" variants={fadeInUp}>
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80"
              animate={{
                rotateZ: [0, 2, 0, -2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-black">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse">
                  <img
                    src="/profile.jpg" // Replace with your image in public/
                    alt="Your profile picture"
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                </div>
              </div>
              {/* Orbiting elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 rounded-full bg-indigo-500/30 backdrop-blur-sm border border-indigo-500/50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                    rotate: 360,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + i,
                    delay: i * 1,
                    ease: "easeInOut",
                  }}
                  style={{
                    top: `${40 + i * 20}%`,
                    left: `${70 + i * 15}%`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Featured Projects Section */}
        <motion.section
          className="mt-32"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-white">Recent Projects</h2>
            <p className="mt-4 text-xl text-gray-400">
              A selection of my most recent projects
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                title: "E-commerce Django",
                description: "Complete e-commerce platform with Django and PostgreSQL",
                tags: ["Django", "PostgreSQL", "Bootstrap"],
                image: "/api/placeholder/600/400",
              },
              {
                title: "Dashboard Analytics",
                description: "Interactive dashboard for real-time data visualization",
                tags: ["React", "D3.js", "API REST"],
                image: "/api/placeholder/600/400",
              },
              {
                title: "Next.js Application",
                description: "High-performance website using the latest Next.js features",
                tags: ["Next.js", "Tailwind CSS", "Vercel"],
                image: "/api/placeholder/600/400",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-900 transition-all duration-500 group"
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(79, 70, 229, 0.3)",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 z-10"
                    animate={{
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="mt-2 text-gray-400">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.div
                    className="mt-6 flex justify-end"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/projects/${index}`}
                      className="text-indigo-400 hover:text-indigo-300 inline-flex items-center group"
                    >
                      <span className="relative">
                        See details
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
                      </span>
                      <ExternalLink className="ml-1" size={16} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-12 text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-indigo-400 font-medium rounded-lg transition-all duration-300"
            >
              See all projects
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mt-32"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-white">My Skills</h2>
            <p className="mt-4 text-xl text-gray-400">
              Technologies I like to work with
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                category: "Backend",
                skills: ["Python", "Django", "PostgreSQL", "API REST", "FastAPI"],
              },
              {
                category: "Frontend",
                skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS"],
              },
              {
                category: "DevOps & Tools",
                skills: ["Git", "Docker", "CI/CD", "AWS", "Heroku"],
              },
            ].map((skillGroup, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(79, 70, 229, 0.5)",
                  boxShadow: "0 10px 30px -10px rgba(79, 70, 229, 0.3)",
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-900/20 rounded-full blur-2xl -mr-16 -mt-16" />
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 relative z-10">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3 relative z-10">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skillIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3" />
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="mt-32 rounded-2xl p-8 sm:p-12 text-white overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          whileHover={{
            boxShadow: "0 20px 60px -10px rgba(79, 70, 229, 0.5)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(to right, #4f46e5, #7e22ce)",
                  "linear-gradient(to right, #6366f1, #9333ea)",
                  "linear-gradient(to right, #4f46e5, #7e22ce)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 bg-black opacity-10" />
            {/* Animated dots pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-white"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    y: [
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: Math.random() * 10 + 10,
                    ease: "easeInOut",
                  }}
                  style={{ scale: Math.random() * 0.5 + 0.5 }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold">Interested in a collaboration?</h2>
              <p className="mt-4 text-xl opacity-90">
                I am currently available for freelance missions or exciting opportunities.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Contact me
                <Mail className="ml-2" size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 relative">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"
          style={{ pointerEvents: "none" }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className="mb-6 md:mb-0" variants={fadeInUp}>
              <Link href="/" className="font-bold text-xl tracking-tight">
                <span className="text-indigo-500">Marc</span>
                <span className="relative">
                  Portfolio
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </span>
              </Link>
              <p className="mt-2 text-gray-500">Created by Marc Kassi</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center md:items-end"
              variants={fadeInUp}
            >
              <div className="flex space-x-4 mb-4">
                {[
                  { icon: <Github size={20} />, url: "https://github.com/votre-username" },
                  { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/votre-profil" },
                  { icon: <Mail size={20} />, url: "mailto:votre-email@example.com" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-500 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Marc Kassi. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}