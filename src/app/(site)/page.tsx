"use client";

import { Button } from "@mui/material";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-black text-gold px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-cinzel mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Healing Harmony Spa
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Where wellness meets luxury.
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
            Book Now
          </Button>
          <Button
            variant="contained"
            color="primary"
            href="/services"
            className="hover:scale-105 transition-transform duration-300"
          >
            Explore Services
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 w-40 h-1 rounded-full bg-gold/40 blur-lg"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Popular Services Section */}
      <motion.div
        className="mt-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Popular Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Deep Tissue Massage",
              desc: "Relieve chronic tension and stress.",
            },
            {
              title: "Hot Stone Therapy",
              desc: "Soothe your muscles with warm stone energy.",
            },
            {
              title: "Couple's Massage",
              desc: "Share a relaxing session with your loved one.",
            },
          ].map((s, idx) => (
            <motion.div
              key={idx}
              className="p-6 border border-gold rounded-lg shadow-lg hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Specials Section */}
      <motion.div
        className="mt-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Current Specials</h2>
        <p className="mb-4">
          Enjoy 15% off all body massage packages through July!
        </p>
        <Button variant="contained" color="secondary" href="/promotions">
          View All Deals
        </Button>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        className="mt-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {[
            "Amazing experience, I felt totally refreshed!",
            "Best spa in town – luxurious and relaxing!",
            "Professional staff and calming environment.",
          ].map((r, i) => (
            <div
              key={i}
              className="p-4 border border-gold rounded-lg max-w-sm mx-auto bg-black/30"
            >
              <p>"{r}"</p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          <a
            href="https://www.google.com/search?q=healing+harmony+spa"
            target="_blank"
            className="underline hover:text-white"
          >
            Read more reviews on Google
          </a>
        </p>
      </motion.div>

      {/* Gallery Section */}
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

      {/* Standalone Booking Section */}
      <motion.div
        className="mt-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Relax?</h2>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          href="https://www.vagaro.com/healingharmonyspallc/book-now"
        >
          Book Your Appointment
        </Button>
      </motion.div>

      <div className="mt-32"></div>
    </motion.div>
  );
}
