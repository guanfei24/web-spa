"use client";

import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-cinzel mb-4">Welcome to Fei</h1>
      <p className="text-lg text-gold mb-8">Where wellness meets luxury.</p>

      <div className="flex gap-4">
        <Button
          variant="outlined"
          color="inherit"
          href="https://www.vagaro.com/healingharmonyspallc/book-now"
        >
          Book Now
        </Button>
        <Button variant="contained" color="primary" href="/services">
          Explore Services
        </Button>
      </div>
    </div>
  );
}
