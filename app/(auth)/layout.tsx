"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/background.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

      {/* Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/assets/visuals/particles.svg"
          alt="particles"
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* === LEFT PANEL === */}
        <section className="hidden lg:flex xl:w-2/5 items-start justify-center relative">
          {/* Gradient Background */}
          <div className="absolute inset-0 h-full w-full rounded-r-[300px] overflow-hidden shadow-2xl z-0">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, #1c3d82, #0d1a38 90%),
                  linear-gradient(to bottom right, #1a4cbf 0%, #0e1d42 100%)
                `,
              }}
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex flex-col items-start px-14 py-16 w-full h-full"
          >
            {/* Logo */}
            <Image
              src="/assets/icons/logo.PNG"
              alt="SkyBox logo"
              width={220}
              height={65}
              className="drop-shadow-lg"
            />

            {/* Tagline */}
            <div className="space-y-5 mt-8">
              <h1 className="text-4xl font-extrabold text-white leading-snug">
                Your Cloud, Organized
              </h1>
              <p className="text-white/80 font-light text-lg leading-relaxed">
                Store. Manage. Access. <br />
                All in one place — beautifully and efficiently.
              </p>
            </div>

            {/* Illustration */}
            <div className="w-full mt-10 flex justify-center">
              <Image
                src="/assets/images/final2.png"
                alt="Cloud Illustration"
                width={1000}
                height={1200}
                className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                priority
              />
            </div>
          </motion.div>
        </section>

        {/* === RIGHT PANEL === */}
        <section className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-xl rounded-3xl bg-white/10 backdrop-blur-[10px] p-10 sm:p-12 lg:p-16 shadow-[0_30px_120px_rgba(0,0,0,0.45)] border border-white/30 ring-1 ring-[#4A90E2]/20 hover:ring-[#4A90E2]/40 transition-all duration-300 ease-in-out hover:scale-[1.02] top-[-60px]"
          >
            {/* Logo for Small Screens */}
            <div className="mb-10 lg:hidden flex justify-center">
              <Image
                src="/assets/icons/logo-full-brand.png"
                alt="SkyBox full logo"
                width={300}
                height={300}
                className="h-auto drop-shadow-sm"
              />
            </div>

            {/* Children Content */}
            <div className="space-y-8 text-black font-medium tracking-wide text-[1.05rem] leading-relaxed">
              {children}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Layout;
