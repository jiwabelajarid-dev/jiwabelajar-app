// File: src/app/testtest/page.tsx

import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Webinar from "@/components/Home/Webinar";
export const metadata: Metadata = {
  title: "JiwaBelajar",
};

// Ini adalah HALAMAN yang akan diakses pengguna.
export default function TestPage() {
  // 2. Tampilkan komponen di dalam halaman ini.
  return (
    <main>
      <HeroSub
        title="COMING SOON"
        pesan="Webinar akan segera hadir, pantau terus ya!"
      />
      <Webinar />
    </main>
  );
}