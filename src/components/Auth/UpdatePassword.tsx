"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Common/Loader";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Logo from "@/components/Layout/Header/Logo";

const UpdatePassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      const errorMessage = "Password harus memiliki minimal 6 karakter.";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    
    if (password !== confirmPassword) {
      const errorMessage = "Password dan konfirmasi password tidak cocok.";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setLoader(true);

    try {
      const supabase = createClient();
      // ✅ INTI LOGIKA: Langsung update user yang sesinya aktif dari magic link
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        throw updateError;
      }

      toast.success("Password Anda berhasil diperbarui!");
      setSuccess(true);
      
      // Arahkan ke halaman sign-in setelah beberapa detik
      setTimeout(() => {
        router.push("/signin");
      }, 3000);

    } catch (err: any) {
      const errorMessage = err.message || "Gagal memperbarui password. Link mungkin sudah kedaluwarsa.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };
  
  // Tampilkan pesan sukses jika berhasil
  if (success) {
    return (
        <section className="bg-[#F4F7FF] py-14 lg:py-20">
            <div className="container">
                <div className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center">
                    <Logo />
                    <h3 className="text-xl font-bold mb-4 mt-10">Sukses!</h3>
                    <p className="text-gray-600">Password Anda telah berhasil diperbarui. Anda akan diarahkan ke halaman Sign In.</p>
                </div>
            </div>
        </section>
    );
  }

  return (
    <section className="bg-[#F4F7FF] py-14 lg:py-20">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center">
              <div className="mb-10 text-center">
                <Link href="/" className="mx-auto inline-block max-w-[160px]">
                  <Logo />
                </Link>
              </div>

              <h2 className="mb-2 text-2xl font-bold text-dark">Buat Password Baru</h2>
              <p className="mb-8 text-base text-gray-500">
                Masukkan password baru Anda di bawah ini.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input
                    type="password"
                    placeholder="Password Baru"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary"
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    placeholder="Konfirmasi Password Baru"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary"
                  />
                </div>
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={loader}
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition hover:bg-opacity-90 disabled:opacity-50"
                  >
                    Simpan Password Baru {loader && <Loader />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;