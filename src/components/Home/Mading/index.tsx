"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Poppins } from "next/font/google";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Kata statis (dummy)
const staticWords = [
    { text: "CAPEK", color: 'bg-gray-200 text-gray-800' },
    { text: "Pusing", color: 'bg-orange-100/80 text-orange-900' },
    { text: "Kecewa", color: 'bg-gray-200 text-gray-800' },
    { text: "Huft", color: 'bg-orange-100/80 text-orange-900' },
    { text: "Lelah", color: 'bg-gray-200 text-gray-800' },
    { text: "Semangat", color: 'bg-orange-100/80 text-orange-900' },
    { text: "Galau", color: 'bg-gray-200 text-gray-800' },
    { text: "Bosan", color: 'bg-orange-100/80 text-orange-900' },
    { text: "Stres", color: 'bg-gray-200 text-gray-800' },
];

const MadingSection = () => {
  const router = useRouter();
  const { user, openSignInModal } = useAuth();
  
  const [displayItems, setDisplayItems] = useState<{ text: string, color: string }[]>(staticWords);

  useEffect(() => {
    const fetchTitlesAndCombine = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("stories")
        .select("title")
        .order("created_at", { ascending: false })
        .limit(10); 

      if (error) {
        console.error("Gagal mengambil judul cerita:", error);
      } else if (data) {
        const storyTitles = data.map(story => ({
            text: story.title.length > 20 ? story.title.slice(0, 20) + '...' : story.title,
            color: 'bg-orange-100/80 text-orange-900'
        }));
        
        const combined = [...staticWords, ...storyTitles];
        for (let i = combined.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [combined[i], combined[j]] = [combined[j], combined[i]];
        }
        setDisplayItems(combined);
      }
    };
    
    fetchTitlesAndCombine();
  }, []);

  const handleActionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      openSignInModal();
    }
  };

  const splitIndex = Math.ceil(displayItems.length / 2) -1; // Bagi dua, dengan tombol di tengah
  const topItems = displayItems.slice(0, splitIndex);
  const bottomItems = displayItems.slice(splitIndex);


  return (
    <section id="mading" className="bg-[#E9EFFF] min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 font-sans text-center overflow-x-hidden">
      {/* Judul & Subjudul Utama Halaman */}
      <div className="mb-8 md:mb-12 mt-16 w-full">
        <h1 className={`${poppins.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight`}>
          Ceritakan Keluh Kesahmu <br className="hidden sm:block" /> di Mading JIWABELAJAR
        </h1>
        <p className="text-gray-600 mt-3 md:mt-4 text-base md:text-lg pb-6 md:pb-8">
          Tempat aman untuk berbagi keluh kesah dan didengar
        </p>
      </div>

      {/* Wrapper Papan Mading */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        
        {/* Tali Papan Mading */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 md:-mt-16 z-0">
          <svg 
            viewBox="0 0 300 80" // Gunakan viewBox untuk skala
            style={{ overflow: 'visible' }} 
            className="w-[150px] h-auto sm:w-[200px]" // Atur lebar responsif, tinggi otomatis
          > 
            <line x1="150" y1="0" x2="0" y2="98" stroke="#6b7280" strokeWidth="2" />
            <line x1="150" y1="0" x2="320" y2="98" stroke="#6b7280" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Papan Mading */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl pt-8 pb-8 px-6 md:pt-12 md:pb-12 md:px-8 relative flex flex-col items-center border-4 border-gray-100 min-h-[350px] sm:min-h-[450px]">
            {/* Lubang pada papan */}
            <div className="absolute top-3 left-8 sm:top-5 sm:left-20 w-3 h-3 sm:w-5 sm:h-5 bg-[#E9EFFF] rounded-full border-2 border-gray-300 z-10"></div>
            <div className="absolute top-3 right-8 sm:top-5 sm:right-20 w-3 h-3 sm:w-5 sm:h-5 bg-[#E9EFFF] rounded-full border-2 border-gray-300 z-10"></div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">Mading Suara</h2>

            {/* Kontainer Flexbox Responsif untuk Kata-kata dan Tombol */}
            <div className="flex flex-col justify-center items-center gap-4 w-full px-4 md:px-8">
                
                {/* Bagian Kata-kata Atas */}
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                    {topItems.map((item, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1 rounded-md shadow-sm font-medium text-sm md:text-base ${item.color} whitespace-nowrap transform transition-transform hover:scale-110`}
                            style={{ transform: `rotate(${((index * 5) % 10) - 5}deg)` }} 
                        >
                            {item.text}
                        </span>
                    ))}
                </div>

                {/* Tombol Utama - Sekarang di tengah antara 2 grup kata */}
                <Link href="/KeluhKesah" passHref legacyBehavior>
                    <a
                        onClick={handleActionClick}
                        className="bg-[#4F46E5] text-white px-5 py-2.5 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-center text-sm md:text-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 block mx-auto" 
                    >
                        Ceritakan <br/> Keluh Kesahmu
                    </a>
                </Link>

                {/* Bagian Kata-kata Bawah */}
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-2"> {/* Tambah margin top */}
                    {bottomItems.map((item, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1 rounded-md shadow-sm font-medium text-sm md:text-base ${item.color} whitespace-nowrap transform transition-transform hover:scale-110`}
                            style={{ transform: `rotate(${((index * 5) % 10) - 5}deg)` }} 
                        >
                            {item.text}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MadingSection;
