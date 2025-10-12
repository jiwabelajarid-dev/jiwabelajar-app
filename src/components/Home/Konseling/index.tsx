"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Konseling = () => {
  return (
    <section className="bg-[#F0F2FF] py-20" id="konseling">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Temukan Konselor <br /> yang Tepat Untukmu
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
              Kami siap mendengarkan dan membimbingmu dengan konselor berpengalaman.
            </p>
            {/* Pakai Link untuk navigasi */}
            <Link href="/not-found">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                Mulai Konseling
              </button>
            </Link>
          </div>

          {/* Kolom Kanan */}
          <div className="flex justify-center">
            <Image 
              src="images/banner/conversation-100.svg"
              alt="Ilustrasi konseling" 
              width={500} 
              height={400}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Konseling;
