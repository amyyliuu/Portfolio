import { motion } from "motion/react";
import { Mail, Linkedin, Github, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-4 bg-[#EDDCC6] relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-20 text-[#BF4646]/20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={32} />
      </motion.div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-[#BF4646] font-semibold tracking-tight">
            Let's Connect!
          </h2>
          <p className="text-gray-700 text-lg mb-8 font-light">
            I'm always excited to collaborate on new projects or just chat about AI and design.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            <motion.a
              href="mailto:amyyliu@mit.edu"
              className="p-4 bg-[#FFF4EA] rounded-full shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} className="text-[#7EACB5]" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/amy-liu-3b7129292/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#FFF4EA] rounded-full shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={24} className="text-[#7EACB5]" />
            </motion.a>
          </div>

          <p className="text-gray-600 text-sm font-light">
            © {currentYear} Amy Liu • Made with <span className="text-[#BF4646]">♥</span> and code
          </p>
        </motion.div>
      </div>
    </footer>
  );
}