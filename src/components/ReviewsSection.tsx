"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "bijan keya",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocLMtaXJhdzUxiDH6w5-njWdaacYBlu9QFXylBDQW-1FMoh7Uw=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Wow I just walked out and I feel like a brand new person. Ms. Rachel has the most intuitive hands she finds exactly where you have pain and tension. Chronic neck pain and stiffness and I haven’t felt this relaxed in so long. Thank you Rachel!",
  },
  {
    name: "Dorian McGarry",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocIlgd988y36tp1UeN1zsnho2ghKmr-9K8BFcDwDA_3xGFtP2w=s128-c0x00000000-cc-rp-mo-ba2",
    rating: 5,
    text: "I recently had an incredible experience with a masseuse who truly worked wonders. From the moment I walked in, the atmosphere was calming... Highly recommend!",
  },
];

export default function ReviewsSection() {
  return (
    <motion.div
      className="mt-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-bold text-gold mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What Our Clients Say
      </motion.h2>

      <motion.p className="text-lg text-gold mb-4 font-semibold">
        Google Rating: 5.0 ⭐⭐⭐⭐⭐
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6 justify-center">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="p-6 border border-gold bg-black/30 rounded-lg text-left flex gap-4 items-start shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <Image
              src={r.photo}
              alt={r.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-white mb-1 font-bold">{r.name}</p>
              <div className="flex items-center mb-2">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 mr-1"
                    style={{ fill: "#FFD700", stroke: "#FFD700" }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{r.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-6">
        <a
          href="https://www.google.com/search?q=healing+harmony+spa"
          target="_blank"
          className="underline text-gold hover:text-white"
        >
          Read more reviews on Google
        </a>
      </p>
    </motion.div>
  );
}
