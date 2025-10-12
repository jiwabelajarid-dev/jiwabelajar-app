// File: src/app/testtest/page.tsx

import { Metadata } from "next";
import TestTest from '../../components/Home/TestTest';
import HeroSub from "@/components/SharedComponent/HeroSub";
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
        pesan="Test akan segera hadir, pantau terus ya!"
      />
      <TestTest />
    </main>
  );
}