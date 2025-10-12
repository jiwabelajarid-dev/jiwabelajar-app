import React from "react";
import Hero from "@/components/Home/Hero";
import Courses from "@/components/Home/Mading";
import Mentor from "@/components/Home/Konseling";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "JiwaBelajar",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Courses />
      <Mentor />
    </main>
  );
}