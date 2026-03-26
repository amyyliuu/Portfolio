import { motion } from "motion/react";

export function Avatar() {
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Long hair - back layer flowing down */}
      <ellipse cx="60" cy="65" rx="36" ry="50" fill="#1a1a1a" />
      
      {/* Body */}
      <ellipse cx="60" cy="105" rx="24" ry="18" fill="#7EACB5" />
      
      {/* Neck */}
      <rect x="54" y="72" width="12" height="12" fill="#EDDCC6" rx="2" />
      
      {/* Head */}
      <circle cx="60" cy="50" r="24" fill="#EDDCC6" />
      
      {/* Curtain bangs - left side */}
      <ellipse 
        cx="44" 
        cy="38" 
        rx="7" 
        ry="22" 
        fill="#1a1a1a"
        transform="rotate(45 44 38)"
      />
      
      {/* Curtain bangs - right side */}
      <ellipse 
        cx="76" 
        cy="38" 
        rx="7" 
        ry="22" 
        fill="#1a1a1a"
        transform="rotate(-45 76 38)"
      />
      
      {/* Eyes */}
      <circle cx="52" cy="48" r="2.5" fill="#2d2d2d" />
      <circle cx="68" cy="48" r="2.5" fill="#2d2d2d" />
      
      {/* Eye sparkles */}
      <circle cx="53" cy="47" r="1" fill="#ffffff" />
      <circle cx="69" cy="47" r="1" fill="#ffffff" />
      
      {/* Blush */}
      <ellipse cx="45" cy="54" rx="5" ry="3" fill="#BF4646" opacity="0.3" />
      <ellipse cx="75" cy="54" rx="5" ry="3" fill="#BF4646" opacity="0.3" />
      
      {/* Smile */}
      <path
        d="M 52 58 Q 60 62 68 58"
        stroke="#2d2d2d"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Left Arm - waving */}
      <motion.g
        animate={{
          rotate: [0, 20, -5, 20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "38px 95px" }}
      >
        <ellipse cx="38" cy="100" rx="7" ry="14" fill="#7EACB5" />
        <circle cx="38" cy="110" r="5" fill="#EDDCC6" />
      </motion.g>
      
      {/* Right Arm */}
      <ellipse cx="82" cy="100" rx="7" ry="14" fill="#7EACB5" />
      <circle cx="82" cy="110" r="5" fill="#EDDCC6" />
    </svg>
  );
}