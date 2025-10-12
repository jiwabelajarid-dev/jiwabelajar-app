// File: src/app/keluh-kesah/page.tsx

import { div } from 'framer-motion/client';
import KeluhKesah from '../../components/Home/KeluhKesah';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "JiwaBelajar",
};

// Ini adalah HALAMAN yang akan diakses pengguna.
export default function KeluhKesahPage() {
  // 2. Tampilkan komponen di dalam halaman ini.
  return (
    <main>
      <KeluhKesah />
    </main>
  );
}