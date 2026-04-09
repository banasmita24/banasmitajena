import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContact } from "@workspace/api-client-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { subject: "Portfolio Contact" }
  });

  const { mutate: submitContact, isPending } = useSubmitContact({
    mutation: {
      onSuccess: (data) => {
        toast({
          title: "Message Sent!",
          description: data.message || "I'll get back to you soon.",
          className: "bg-primary text-primary-foreground border-none rounded-2xl",
        });
        reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Oops!",
          description: "Something went wrong. Please try again.",
          className: "rounded-2xl",
        });
      }
    }
  });

  const onSubmit = (data: FormData) => submitContact({ data });

  return (
    <section id="contact" className="py-24 relative z-10">
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
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">Get In Touch</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column */}
            <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} className="flex flex-col justify-center">
              <h3 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">Let's work <br/><span className="gradient-text">together.</span></h3>
              <p className="text-lg md:text-xl text-foreground/70 font-medium mb-12 max-w-md">
                Open for research collaborations, internships, and exciting projects. Let's build something intelligent.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="mailto:banasmitajena2405@gmail.com" className="flex items-center gap-3 px-6 py-4 glass rounded-full font-bold hover:bg-secondary/50 hover:scale-105 transition-all">
                  <Mail className="text-primary" /> Email Me
                </a>
                <a href="https://linkedin.com/in/banasmita-jena-z2405" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 glass rounded-full font-bold hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:scale-105 transition-all">
                  <Linkedin className="text-[#0A66C2]" /> LinkedIn
                </a>
                <a href="https://github.com/banasmita24" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 glass rounded-full font-bold hover:bg-foreground/5 hover:scale-105 transition-all">
                  <Github /> GitHub
                </a>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}>
              <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 md:p-10 rounded-3xl flex flex-col gap-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-2 -mt-2 pointer-events-none blur-xl" />
                
                <div className="flex flex-col gap-2">
                  <input 
                    {...register("name")}
                    className="w-full px-6 py-4 rounded-2xl glass border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg"
                    placeholder="Name"
                  />
                  {errors.name && <span className="text-sm font-bold text-destructive ml-2">{errors.name.message}</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                  <input 
                    {...register("email")}
                    className="w-full px-6 py-4 rounded-2xl glass border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg"
                    placeholder="Email"
                  />
                  {errors.email && <span className="text-sm font-bold text-destructive ml-2">{errors.email.message}</span>}
                </div>

                <input type="hidden" {...register("subject")} />

                <div className="flex flex-col gap-2">
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl glass border-border text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium text-lg"
                    placeholder="Message"
                  />
                  {errors.message && <span className="text-sm font-bold text-destructive ml-2">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit"
                  disabled={isPending}
                  className="mt-2 w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 transition-all duration-300"
                >
                  {isPending ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={20} /></>}
                </button>
              </form>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
