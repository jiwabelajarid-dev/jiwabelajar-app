// src/components/Auth/SocialLogin.tsx

"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { Icon } from "@iconify/react"; // Gunakan Iconify untuk konsistensi

const SocialLogin = () => {
  const supabase = createClient();

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        // Arahkan pengguna kembali ke halaman mading setelah login berhasil
        redirectTo: `${window.location.origin}/KeluhKesah`, 
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Google Login */}
      <button
        onClick={() => handleOAuthLogin('google')}
        className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-300 bg-white p-3.5 text-black hover:bg-gray-50"
      >
        <Icon icon="flat-color-icons:google" width="22" />
        Lanjutkan dengan Google
      </button>

      {/* Facebook Login */}
      <button
        onClick={() => handleOAuthLogin('facebook')}
        className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#1877F2] p-3.5 text-white hover:bg-opacity-90"
      >
        <Icon icon="logos:facebook" width="22" />
        Lanjutkan dengan Facebook
      </button>
    </div>
  );
};

export default SocialLogin;