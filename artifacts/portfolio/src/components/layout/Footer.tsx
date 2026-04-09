import { Heart, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center gap-8">
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/banasmita24" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-secondary/50 text-foreground/70 hover:text-foreground hover:bg-secondary hover:-translate-y-1 transition-all">
            <Github size={22} />
          </a>
          <a href="https://linkedin.com/in/banasmita-jena-z2405" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-secondary/50 text-foreground/70 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:-translate-y-1 transition-all">
            <Linkedin size={22} />
          </a>
          <a href="mailto:banasmitajena2405@gmail.com" className="p-3 rounded-full bg-secondary/50 text-foreground/70 hover:text-primary hover:bg-primary/10 hover:-translate-y-1 transition-all">
            <Mail size={22} />
          </a>
        </div>
        
        <div className="text-center">
          <p className="text-foreground/80 font-medium flex items-center justify-center gap-2 text-lg">
            Designed & built with <Heart size={18} className="text-primary" fill="currentColor" /> by <span className="font-bold gradient-text">Banasmita Jena</span>
          </p>
          <p className="text-sm text-foreground/40 mt-3 font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
