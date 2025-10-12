"use client";
import React from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


const wordsData = [
    { text: "ME", style: { top: '20%', left: '10%', transform: 'rotate(-15deg)' }, color: 'bg-gray-200' },
    { text: "Story", style: { top: '35%', left: '18%', transform: 'rotate(10deg)' }, color: 'bg-orange-100/80' },
    { text: "If", style: { top: '48%', left: '12%', transform: 'rotate(-5deg)' }, color: 'bg-gray-200' },
    { text: "Over", style: { top: '60%', left: '15%', transform: 'rotate(12deg)' }, color: 'bg-orange-100/80' },
    { text: "Need", style: { top: '75%', left: '20%', transform: 'rotate(-8deg)' }, color: 'bg-gray-200' },
    { text: "Sight", style: { top: '85%', left: '22%', transform: 'rotate(15deg)' }, color: 'bg-gray-200' },
    { text: "Are", style: { top: '20%', left: '35%', transform: 'rotate(8deg)' }, color: 'bg-orange-100/80' },
    { text: "Easy", style: { top: '80%', left: '35%', transform: 'rotate(5deg)' }, color: 'bg-gray-200' },
    { text: "Care", style: { top: '65%', left: '30%', transform: 'rotate(10deg)' }, color: 'bg-orange-100/80' },
    { text: "Worry", style: { top: '70%', left: '55%', transform: 'rotate(-12deg)' }, color: 'bg-gray-200' },
    { text: "Use", style: { top: '75%', left: '75%', transform: 'rotate(8deg)' }, color: 'bg-orange-100/80' },
    { text: "Dead", style: { top: '60%', left: '78%', transform: 'rotate(5deg)' }, color: 'bg-gray-200' },
    { text: "Why", style: { top: '50%', left: '82%', transform: 'rotate(-10deg)' }, color: 'bg-orange-100/80' },
    { text: "As", style: { top: '38%', left: '85%', transform: 'rotate(15deg)' }, color: 'bg-gray-200' },
    { text: "Huh", style: { top: '25%', left: '85%', transform: 'rotate(-8deg)' }, color: 'bg-orange-100/80' },
    { text: "Ok", style: { top: '15%', right: '12%', transform: 'rotate(10deg)' }, color: 'bg-gray-200' },
    { text: "Don't", style: { top: '20%', right: '2%', transform: 'rotate(12deg)' }, color: 'bg-orange-100/80' },
    { text: "Always", style: { top: '10%', right: '25%', transform: 'rotate(-8deg)' }, color: 'bg-gray-200' },
    { text: "Never", style: { top: '15%', left: '45%', transform: 'rotate(5deg)' }, color: 'bg-orange-100/80' },
];

const MadingSection = () => {
    return (
        <section id="mading" className="bg-[#E9EFFF] min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans text-center">
            {/* Judul & Subjudul */}
            <div className="mb-10 mt-16">
                <h1 className={`${poppins.className} text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight`}>
                    Ceritakan Keluh Kesahmu <br /> di Mading JIWABELAJAR
                </h1>
                <p className="text-gray-600 mt-4 text-lg pb-8">
                    Tempat aman untuk berbagi keluh kesah dan didengar
                </p>
            </div>

            <div className="relative w-full max-w-2xl lg:max-w-3xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-16 z-0">
                    <svg width="300" height="80" style={{ overflow: 'visible' }}>
                        <line x1="150" y1="0" x2="60" y2="78" stroke="#6b7280" strokeWidth="2" />
                        <line x1="150" y1="0" x2="240" y2="78" stroke="#6b7280" strokeWidth="2" />
                    </svg>
                </div>
                
                {/* Papan Mading */}
                <div className="bg-white rounded-3xl shadow-xl pt-12 pb-12 px-8 relative aspect-[1.5/1] flex flex-col items-center border-4 border-gray-100">
                    <div className="absolute top-5 left-20 w-5 h-5 bg-[#E9EFFF] rounded-full border-2 border-gray-300"></div>
                    <div className="absolute top-5 right-20 w-5 h-5 bg-[#E9EFFF] rounded-full border-2 border-gray-300"></div>

                    {/* Judul "Mading" */}
                    <h2 className="text-3xl font-bold text-gray-700 mb-4">Mading Suara</h2>

                    {/* Area konten dengan kata-kata dan tombol */}
                    <div className="relative flex-grow w-full flex items-center justify-center mt-4">
                        {/* Kata-kata yang tersebar */}
                        {wordsData.map((word, index) => (
                            <span
                                key={index}
                                className={`absolute px-3 py-1 text-gray-800 rounded-md shadow-sm font-medium text-sm md:text-base ${word.color}`}
                                style={word.style}
                            >
                                {word.text}
                            </span>
                        ))}

                        {/* Tombol Utama di Tengah */}
                        <Link
                            href="/KeluhKesah"
                            className="relative z-10 bg-[#4F46E5] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-center text-base md:text-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                        >
                            Ceritakan <br /> Keluh Kesahmu
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MadingSection;