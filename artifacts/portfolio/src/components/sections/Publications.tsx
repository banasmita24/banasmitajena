import { motion } from "framer-motion";

const publications = [
  {
    title: "Development of IoT Platform for Smart Kitchen Management (AIoT Edge System)",
    conference: "AIDE Conference 2026",
    tags: ["AIoT", "Edge Computing", "Smart Systems"]
  },
  {
    title: "CBAM-Enhanced CNN for Disaster Classification with XAI and Federated Learning",
    conference: "CCIC Conference 2026",
    tags: ["Computer Vision", "XAI", "Federated Learning"]
  }
];

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <motion.div 
          className="w-full max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">Publications</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((pub, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="glass p-8 rounded-3xl flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border"
              >
                <div className="mb-6 inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                  <span className="text-sm font-bold tracking-wide uppercase">{pub.conference}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-8 leading-snug flex-grow group-hover:text-primary transition-colors">
                  {pub.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-border/50">
                  {pub.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground border border-secondary-foreground/10">
                      {tag}
                    </span>
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
