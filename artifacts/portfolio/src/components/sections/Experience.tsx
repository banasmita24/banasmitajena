import { motion } from "framer-motion";

const items = [
  {
    role: "AIML Intern",
    company: "Infosys Springboard",
    date: "Dec 2025–Feb 2026",
    details: ["Python, DSA & AIML training", "Built ML mini-project demonstrating problem-solving"],
    color: "bg-primary"
  },
  {
    role: "Project Administrator",
    company: "GirlScript Summer of Code",
    date: "Aug–Nov 2025",
    details: ["Led open-source contributions", "Reviewed PRs, mentored contributors for code quality"],
    color: "bg-accent"
  },
  {
    role: "Open Source Contributor",
    company: "GSSOC Extended",
    date: "Oct–Nov 2024",
    details: ["Ranked 189th among participants"],
    color: "bg-secondary"
  },
  {
    role: "Reliance Foundation Scholar",
    company: "Reliance Foundation",
    date: "2023",
    details: ["Awarded for academic excellence and merit"],
    color: "bg-primary"
  },
  {
    role: "Board Member",
    company: "RUDRA Data Analytics Club",
    date: "2023–2025",
    details: ["Strategic planning & technical initiatives"],
    color: "bg-accent"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <motion.div 
          className="w-full max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">Experience & Leadership</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>

          <div className="relative border-l-2 border-dashed border-primary/30 ml-4 md:ml-8 space-y-12 pb-8">
            {items.map((item, index) => (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="relative pl-8 md:pl-12"
              >
                {/* Colored Dot */}
                <div className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full ${item.color} border-4 border-background shadow-[0_0_15px_currentColor]`} />
                
                <div className="glass p-6 md:p-8 rounded-3xl group hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{item.role}</h3>
                      <p className="text-lg font-medium text-foreground/60 mt-1">{item.company}</p>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground font-bold text-sm whitespace-nowrap border border-secondary">
                      {item.date}
                    </span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-foreground/80 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-base">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
