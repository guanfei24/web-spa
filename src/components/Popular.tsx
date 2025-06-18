"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Popular() {
  const services = [
    {
      title: "Deep Tissue Massage",
      desc: "Relieve chronic tension and stress.",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipNEluscGvo7ITUlhtR-91Ni3kE3BjBbmkOYPBjS=w298-h298-k-no",
    },
    {
      title: "Hot Stone Therapy",
      desc: "Soothe your muscles with warm stone energy.",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipNEluscGvo7ITUlhtR-91Ni3kE3BjBbmkOYPBjS=w298-h298-k-no",
    },
    {
      title: "Couple's Massage",
      desc: "Share a relaxing session with your loved one.",
      image:
        "https://lh3.googleusercontent.com/p/AF1QipNEluscGvo7ITUlhtR-91Ni3kE3BjBbmkOYPBjS=w298-h298-k-no",
    },
  ];

  return (
    <motion.div
      className="mt-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">Popular Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, idx) => (
          <motion.div
            key={idx}
            className="p-4 border border-gold rounded-lg shadow-lg hover:scale-105 transition-transform bg-black "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gold">{s.title}</h3>
            <p className="text-sm text-gold/80">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* View All Services */}
      <div className="mt-10">
        <Link
          href="/services"
          className="inline-block bg-gold text-black font-semibold py-2 px-6 rounded-md shadow hover:opacity-90 transition"
        >
          View All Services
        </Link>
      </div>
    </motion.div>
  );
}
