import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.h1
        className="text-5xl md:text-6xl font-cinzel mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {`Welcome to Healing Harmony Spa`}
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {`Where wellness meets luxury.`}
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <Button
          variant="outlined"
          color="inherit"
          href="https://www.vagaro.com/healingharmonyspallc/book-now"
          className="hover:scale-105 transition-transform duration-300"
        >
          {`Book Now`}
        </Button>
        <Button
          variant="contained"
          color="primary"
          href="/services"
          className="hover:scale-105 transition-transform duration-300"
        >
          {`Explore Services`}
        </Button>
      </motion.div>

      <motion.div
        className="mt-12 w-40 h-1 rounded-full bg-gold/40 blur-lg"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
      />
    </div>
  );
}
