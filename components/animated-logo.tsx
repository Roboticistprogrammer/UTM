"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AnimatedLogo() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={loaded ? { scale: 1, opacity: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
        className="relative h-24 w-24 sm:h-32 sm:w-32"
      >
        <Image src="/images/dronex-logo.png" alt="DroneX Logo" fill className="object-contain" priority />
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">DroneX Platform</h1>

        <motion.p
          className="mt-2 text-sm text-gray-600 italic"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Transforming Delivery One flight at a time
        </motion.p>
      </motion.div>
    </div>
  )
}

