"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpecialsProps {
  active: boolean;
  message: string;
}

export default function Specials({ active, message }: SpecialsProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="bg-gold/10 text-center py-2 px-4 text-sm font-serif tracking-wide rounded-md shadow-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="shimmer-sweep">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
