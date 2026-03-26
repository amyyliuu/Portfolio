import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

export function FlowProject() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-64"
    >
      {/* Project Title and Description - Outside Box */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl mb-6 text-[#BF4646]"
        >
          Nevada's DMV Website Redesign
        </motion.h3>
        
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {["UX Research", "Case Study", "UI/UX Design", "Accessibility", "Prototyping"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="px-4 py-2 bg-[#EDDCC6] rounded-full text-[#7EACB5] text-sm font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-700 text-lg leading-relaxed max-w-3xl mb-4"
        >
          As a Southern Nevadan born and raised, I will tell you that all Nevadans share an equal, passionate loathing for the DMV. And half of it is the website. After my brother failed to schedule his drivers test due to "Drivers Test Appointments" not being under or nevertheless remotely near the "Drivers License Appointments" section, I knew something had to be done.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-700 text-lg leading-relaxed max-w-3xl"
        >
          So here's a comprehensive case study analyzing the usability issues of Nevada's DMV website and proposing a redesigned user experience that prioritizes accessibility, clarity, and efficiency for all users.
        </motion.p>
      </div>

      {/* Project Content with Diagonal Background */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative -mx-4 md:-mx-8 px-4 md:px-8 py-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#7EACB5]/20 to-[#EDDCC6]/30 transform -skew-y-2 origin-top-left"></div>
        
        <div className="relative">
          {/* Iframe Container */}
          <div className="rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "75%" }}>
              <iframe
                src="https://pacing-clasp-75431151.figma.site"
                className="absolute top-0 left-0 w-full h-full"
                title="Nevada DMV Redesign Case Study"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}