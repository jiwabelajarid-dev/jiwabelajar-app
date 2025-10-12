"use client";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Common/Loader";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";


import Logo from "@/components/Layout/Header/Logo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Silakan masukkan alamat email Anda.");
      return;
    }

    setLoader(true);
    setError(""); 
    setSuccessMessage("");

    try {
      const supabase = createClient();
      const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (supabaseError) {
        throw supabaseError;
      }

      setSuccessMessage("Link untuk reset password telah dikirim. Silakan periksa email Anda.");
      toast.success("Email terkirim!");
      setEmail("");
    } catch (err: any) {
      const errorMessage = err.message || "Gagal mengirim email. Coba lagi nanti.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  if (successMessage) {
    return (
        <section className="bg-[#F4F7FF] py-14 lg:py-20">
            <div className="container">
                <div
                    className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center"
                >
                    <div className="mb-10 text-center">
                        <Link href="/" className="mx-auto inline-block max-w-[160px]">
                            <Logo />
                        </Link>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Periksa Email Anda</h3>
                    <p className="text-gray-600">{successMessage}</p>
                    <Link href="/signin" className="mt-6 inline-block text-base font-medium text-primary hover:underline">
                        Kembali ke Sign In
                    </Link>
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
            <div
              className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center"
            >
              <div className="mb-10 text-center">
                <Link href="/" className="mx-auto inline-block max-w-[160px]">
                    <Logo />
                </Link>
              </div>

              <h2 className="mb-2 text-2xl font-bold text-dark">Lupa Password Anda?</h2>
              <p className="mb-8 text-base text-gray-500">
                Masukkan email Anda dan kami akan mengirimkan link untuk mereset password.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary"
                  />
                </div>
                
                {}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={loader}
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition hover:bg-opacity-90 disabled:opacity-50"
                  >
                    Kirim Email Reset Password {loader && <Loader />}
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

export default ForgotPassword;