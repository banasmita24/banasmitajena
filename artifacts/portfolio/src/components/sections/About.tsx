import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        <motion.div
          className="w-full max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">About Me</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
            className="glass p-8 md:p-12 rounded-3xl border-l-4 border-l-primary"
          >
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
              I'm a B.Tech Computer Science student specialising in AI & ML, with a passion for building intelligent systems that sit at the edge of research and real-world impact.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
