import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const roles = [
  "AI/ML Enthusiast",
  "Open Source Contributor",
  "Deep Learning Researcher",
  "IoT & Edge Systems"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-display text-foreground tracking-tight mb-4 leading-tight font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Hi, I'm <br className="md:hidden" /><strong className="gradient-text font-extrabold">Banasmita Jena</strong>
        </motion.h1>

        <motion.div
          className="h-14 md:h-20 flex items-center justify-center overflow-hidden mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground/80"
            >
              {roles[roleIndex]}
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="max-w-2xl text-lg md:text-xl text-foreground/70 font-medium mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Building intelligent systems at the intersection of AI, robotics, and edge computing.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagneticButton
            href="#projects"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:glow-primary transition-all duration-300 w-full sm:w-auto text-center"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="https://drive.google.com/file/d/1N8jS19M8cRy9klDCSa2TIPUwwAzsoBuC/preview"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-full glass text-foreground font-semibold hover:bg-secondary/50 transition-all duration-300 w-full sm:w-auto text-center shadow-sm"
          >
            View Resume
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-8 py-4 rounded-full bg-transparent border-2 border-primary/50 text-foreground font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto text-center"
          >
            Contact Me
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
