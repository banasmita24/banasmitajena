import { motion } from "framer-motion";
import { TiltCard } from "@/components/three/FloatingScene";

const projects = [
  {
    title: "CBAM-Enhanced CNN for Disaster Classification",
    description: "Privacy-preserving disaster image classification with attention mechanisms and Federated Learning",
    tech: ["Python", "TensorFlow", "Federated Learning", "XAI", "CNN", "CBAM"],
    metrics: "94.49% accuracy ↑ from 93.87%",
    colorTheme: "from-purple-500/20 to-purple-600/20",
    borderTheme: "border-purple-500/30",
    glowTheme: "hover:shadow-[0_8px_40px_rgba(168,85,247,0.3)]",
    metricColor: "text-purple-600 dark:text-purple-400"
  },
  {
    title: "AIoT Smart Kitchen Management",
    description: "Edge AI system on ESP32 for real-time smart kitchen automation with deployed ML model",
    tech: ["ESP32", "Python", "Edge ML", "IoT", "TensorFlow Lite"],
    metrics: "97.17% test accuracy",
    colorTheme: "from-blue-500/20 to-cyan-500/20",
    borderTheme: "border-blue-500/30",
    glowTheme: "hover:shadow-[0_8px_40px_rgba(59,130,246,0.3)]",
    metricColor: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "EKF-SLAM (Python)",
    description: "Real-time robot localization and mapping with Extended Kalman Filter in simulated environments",
    tech: ["Python", "ROS", "SLAM", "Kalman Filter", "Robotics"],
    metrics: "0.074m mean position error",
    colorTheme: "from-pink-500/20 to-rose-500/20",
    borderTheme: "border-pink-500/30",
    glowTheme: "hover:shadow-[0_8px_40px_rgba(236,72,153,0.3)]",
    metricColor: "text-pink-600 dark:text-pink-400"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">Featured Projects</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <TiltCard key={i} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`glass rounded-3xl p-8 flex flex-col h-full relative overflow-hidden transition-all duration-300 border-t-[3px] group ${project.borderTheme} ${project.glowTheme} hover:-translate-y-2`}
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${project.colorTheme} rounded-full blur-[40px] opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight relative z-10">{project.title}</h3>
                <p className="text-base md:text-lg text-foreground/70 mb-8 flex-grow font-medium relative z-10">{project.description}</p>
                
                <div className="mb-8 p-4 rounded-2xl bg-background/40 backdrop-blur-md border border-border/50 inline-block w-fit relative z-10">
                  <p className={`text-sm md:text-base font-bold flex items-center gap-2 ${project.metricColor}`}>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {project.metrics}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-secondary/80 text-secondary-foreground border border-secondary-foreground/10">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
