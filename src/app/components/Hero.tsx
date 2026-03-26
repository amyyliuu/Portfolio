import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { Avatar } from "./Avatar";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#FFF4EA]">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 text-[#BF4646]/30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={32} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 text-[#7EACB5]/30"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart size={28} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-10 text-[#EDDCC6]/50"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={24} />
      </motion.div>

      {/* Main content */}
      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Avatar />
          </motion.div>
          
          <h1 className="text-7xl md:text-8xl mb-4 text-[#BF4646] font-semibold tracking-tight">
            Hi, I'm Amy Liu
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MIT Student studying{" "}
          <span className="text-[#7EACB5] font-normal">
            Artificial Intelligence
          </span>{" "}
          &{" "}
          <span className="text-[#BF4646] font-normal">Design</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="inline-block cursor-pointer"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ 
                behavior: "smooth" 
              });
            }}
          >
            <p className="text-gray-600 mb-2 font-light">Scroll to explore my work</p>
            <div className="text-3xl text-[#7EACB5]">↓</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}