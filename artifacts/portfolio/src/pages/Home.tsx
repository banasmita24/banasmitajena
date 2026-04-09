import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Publications />
      <Skills />
      <Contact />
    </main>
  );
}
