"use client"

import { motion } from "framer-motion"

export default function FlyingDrone() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-8 h-8"
        initial={{ x: -100, y: "50vh", opacity: 0 }}
        animate={{
          x: ["0vw", "20vw", "40vw", "60vw", "80vw", "100vw"],
          y: ["50vh", "40vh", "60vh", "45vh", "55vh", "50vh"],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4.5 10 2 8.5 12 2z" fill="#e74c3c" />
          <path d="M12 2l7.5 8L22 8.5 12 2z" fill="#e74c3c" />
          <path d="M12 22l-7.5-8L2 15.5 12 22z" fill="#e74c3c" />
          <path d="M12 22l7.5-8 2.5 1.5L12 22z" fill="#e74c3c" />
          <circle cx="12" cy="12" r="3" fill="#0d47a1" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute w-6 h-6"
        initial={{ x: -100, y: "30vh", opacity: 0 }}
        animate={{
          x: ["0vw", "30vw", "50vw", "70vw", "90vw", "110vw"],
          y: ["30vh", "25vh", "35vh", "20vh", "30vh", "25vh"],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1,
          delay: 5,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4.5 10 2 8.5 12 2z" fill="#e74c3c" />
          <path d="M12 2l7.5 8L22 8.5 12 2z" fill="#e74c3c" />
          <path d="M12 22l-7.5-8L2 15.5 12 22z" fill="#e74c3c" />
          <path d="M12 22l7.5-8 2.5 1.5L12 22z" fill="#e74c3c" />
          <circle cx="12" cy="12" r="3" fill="#0d47a1" />
        </svg>
      </motion.div>
    </div>
  )
}

