import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C++", "C", "JavaScript", "SQL"],
    color: "pink",
    gradient: "from-pink-400 to-rose-400",
    glow: "hover:shadow-pink-300/50 dark:hover:shadow-pink-500/30",
    badge: "bg-pink-100/60 dark:bg-pink-900/25 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-700/40",
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Flask", "NumPy", "Pandas", "Matplotlib", "OpenCV", "spaCy"],
    color: "violet",
    gradient: "from-violet-400 to-purple-500",
    glow: "hover:shadow-violet-300/50 dark:hover:shadow-violet-500/30",
    badge: "bg-violet-100/60 dark:bg-violet-900/25 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700/40",
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Docker", "Kubernetes", "Streamlit"],
    color: "sky",
    gradient: "from-sky-400 to-blue-500",
    glow: "hover:shadow-sky-300/50 dark:hover:shadow-sky-500/30",
    badge: "bg-sky-100/60 dark:bg-sky-900/25 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700/40",
  },
  {
    title: "Core Concepts",
    skills: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
    color: "emerald",
    gradient: "from-emerald-400 to-teal-500",
    glow: "hover:shadow-emerald-300/50 dark:hover:shadow-emerald-500/30",
    badge: "bg-emerald-100/60 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/40",
  },
  {
    title: "Domains",
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP"],
    color: "amber",
    gradient: "from-amber-400 to-orange-400",
    glow: "hover:shadow-amber-300/50 dark:hover:shadow-amber-500/30",
    badge: "bg-amber-100/60 dark:bg-amber-900/25 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/40",
  }
];

function SkillBadge({ skill, badge, glow, delay }: { skill: string; badge: string; glow: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay, duration: 0.35, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative px-5 py-2.5 rounded-full font-semibold text-sm md:text-base border backdrop-blur-sm cursor-default transition-shadow duration-300 shadow-sm ${badge} ${hovered ? glow : ""} hover:shadow-lg`}
    >
      {hovered && (
        <motion.div
          layoutId="skill-glow"
          className="absolute inset-0 rounded-full opacity-20 blur-md bg-current"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
        />
      )}
      {skill}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">

        <motion.div
          className="w-full max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">Technical Skills</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>

          <div className="space-y-14">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-5 w-1.5 rounded-full bg-gradient-to-b ${category.gradient}`} />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {category.skills.map((skill, idx) => (
                    <SkillBadge
                      key={idx}
                      skill={skill}
                      badge={category.badge}
                      glow={category.glow}
                      delay={idx * 0.04}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
