"use client";

import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Popular from "@/components/Popular";
import ReviewsSection from "@/components/ReviewsSection";
import Specials from "@/components/Specials";
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
      {/* Specials Section */}
      <Specials
        active={true}
        message="🔥 Enjoy 15% off all body massage packages through July 4th!"
      />
      {/* Hero Section */}
      <Hero />

      {/* Popular Services Section */}
      <Popular />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Gallery Section */}
      <Gallery />

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
          {`Book Your Appointment`}
        </Button>
      </motion.div>

      <div className="mt-32" />
    </motion.div>
  );
}
