import React from "react";
import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <motion.div
      className="mt-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">Our Space</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg max-w-[300px] mx-auto"
          >
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipNEluscGvo7ITUlhtR-91Ni3kE3BjBbmkOYPBjS=w298-h298-k-no"
              alt={`Spa photo ${idx + 1}`}
              className="object-cover w-full h-auto hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
