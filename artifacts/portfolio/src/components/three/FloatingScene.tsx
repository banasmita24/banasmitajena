import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

const blobs = [
  {
    size: 380, top: "3%", left: "-8%",
    gradient: "radial-gradient(circle at 40% 40%, rgba(168,85,247,0.22), rgba(236,72,153,0.10) 60%, transparent)",
    duration: 18, delay: 0,
    r0: "60% 40% 30% 70% / 60% 30% 70% 40%",
    r1: "30% 60% 70% 40% / 50% 60% 30% 60%",
    r2: "50% 50% 40% 60% / 40% 70% 60% 30%",
  },
  {
    size: 300, top: "25%", left: "-5%",
    gradient: "radial-gradient(circle at 60% 40%, rgba(96,165,250,0.18), rgba(168,85,247,0.08) 60%, transparent)",
    duration: 22, delay: -6,
    r0: "40% 60% 60% 40% / 70% 30% 70% 30%",
    r1: "60% 40% 30% 70% / 40% 60% 40% 60%",
    r2: "30% 70% 50% 50% / 60% 40% 60% 40%",
  },
  {
    size: 420, top: "-5%", left: "65%",
    gradient: "radial-gradient(circle at 40% 60%, rgba(236,72,153,0.15), rgba(96,165,250,0.10) 60%, transparent)",
    duration: 20, delay: -4,
    r0: "70% 30% 50% 50% / 30% 70% 40% 60%",
    r1: "40% 60% 70% 30% / 60% 40% 60% 40%",
    r2: "60% 40% 30% 70% / 50% 50% 70% 30%",
  },
  {
    size: 280, top: "55%", left: "72%",
    gradient: "radial-gradient(circle at 50% 50%, rgba(52,211,153,0.14), rgba(168,85,247,0.09) 60%, transparent)",
    duration: 16, delay: -8,
    r0: "50% 50% 30% 70% / 40% 60% 40% 60%",
    r1: "30% 70% 60% 40% / 60% 40% 70% 30%",
    r2: "70% 30% 40% 60% / 30% 70% 50% 50%",
  },
  {
    size: 320, top: "70%", left: "-6%",
    gradient: "radial-gradient(circle at 55% 45%, rgba(168,85,247,0.16), rgba(52,211,153,0.08) 60%, transparent)",
    duration: 19, delay: -3,
    r0: "45% 55% 60% 40% / 55% 45% 35% 65%",
    r1: "65% 35% 40% 60% / 35% 65% 55% 45%",
    r2: "35% 65% 55% 45% / 65% 35% 45% 55%",
  },
  {
    size: 260, top: "85%", left: "60%",
    gradient: "radial-gradient(circle at 45% 55%, rgba(96,165,250,0.16), rgba(236,72,153,0.08) 60%, transparent)",
    duration: 24, delay: -10,
    r0: "55% 45% 35% 65% / 45% 55% 65% 35%",
    r1: "35% 65% 55% 45% / 65% 35% 45% 55%",
    r2: "65% 35% 45% 55% / 35% 65% 55% 45%",
  },
];

const diamonds = [
  { size: 20, top: "8%",  left: "10%",  color: "rgba(168,85,247,0.32)", dur: 8,  delay: 0   },
  { size: 12, top: "18%", left: "85%",  color: "rgba(236,72,153,0.35)", dur: 9,  delay: 1   },
  { size: 16, top: "32%", left: "5%",   color: "rgba(96,165,250,0.38)", dur: 11, delay: 2   },
  { size: 10, top: "42%", left: "92%",  color: "rgba(52,211,153,0.38)", dur: 7,  delay: 3   },
  { size: 14, top: "55%", left: "12%",  color: "rgba(245,158,11,0.32)", dur: 13, delay: 0.5 },
  { size: 18, top: "65%", left: "88%",  color: "rgba(168,85,247,0.30)", dur: 10, delay: 1.5 },
  { size: 11, top: "75%", left: "7%",   color: "rgba(236,72,153,0.32)", dur: 8,  delay: 4   },
  { size: 15, top: "82%", left: "80%",  color: "rgba(96,165,250,0.35)", dur: 12, delay: 2.5 },
  { size: 9,  top: "90%", left: "45%",  color: "rgba(52,211,153,0.35)", dur: 9,  delay: 1   },
  { size: 13, top: "48%", left: "50%",  color: "rgba(168,85,247,0.22)", dur: 15, delay: 6   },
];

export default function FloatingScene() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: b.top, left: b.left,
            width: b.size, height: b.size,
            background: b.gradient,
            borderRadius: b.r0,
            filter: "blur(3px)",
          }}
          animate={{ borderRadius: [b.r0, b.r1, b.r2, b.r1, b.r0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        />
      ))}

      {diamonds.map((d, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: d.top, left: d.left,
            width: d.size, height: d.size,
            background: d.color,
            transform: "rotate(45deg)",
          }}
          animate={{ y: [0, -16, 0], rotate: [45, 90, 45], scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}
    </div>
  );
}
