// app/forgot-password/page.tsx

import ForgotPassword from "@/components/Auth/ForgotPassword"; // Pastikan path ini benar

export default function ForgotPasswordPage() {
  // File ini adalah Server Component.
  // Tugasnya hanya untuk merender Client Component di bawah ini.
  // JANGAN letakkan "use client" atau useState di sini.
  return <ForgotPassword />;
}