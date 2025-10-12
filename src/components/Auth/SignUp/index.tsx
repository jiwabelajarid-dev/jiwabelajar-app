"use client";
import { useState } from "react";
import SocialLogin from "../SosialLogin";
import Logo from "@/components/Layout/Header/Logo";
import Loader from "@/components/Common/Loader";
import { createClient } from "@/utils/supabase/client";


type SignUpProps = {
  onSwitchToSignIn?: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // ✨ DITAMBAHKAN: State untuk menampilkan pesan sukses
  const [successMessage, setSuccessMessage] = useState("");

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage(""); // Reset pesan sukses setiap kali submit

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // ✅ DIUBAH: Alih-alih redirect, tampilkan pesan sukses
        setSuccessMessage(
          "Pendaftaran berhasil! Silakan periksa kotak masuk email Anda untuk verifikasi."
        );
      }
    } catch (err: any) {
      setError("Terjadi kesalahan saat mendaftar.");
    }

    setLoading(false);
  };
  
  if (successMessage) {
    return (
      <div className="text-center">
        <div className="mb-10 mx-auto inline-block max-w-[160px]">
          <Logo />
        </div>
        <h3 className="text-xl font-bold mb-4">Verifikasi Email Anda</h3>
        <p className="text-gray-600">{successMessage}</p>
        <p className="mt-4">
          Setelah verifikasi, Anda bisa menutup jendela ini dan Sign In.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Logo */}
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialLogin />

      <span className="z-1 relative my-8 block text-center before:content-[''] before:absolute before:h-px before:w-[40%] before:bg-black/15 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-[40%] after:bg-black/15 after:top-3 after:right-0">
        <span className="text-body-secondary relative z-10 inline-block px-3 text-base text-black">
          OR
        </span>
      </span>

      <form onSubmit={registerUser}>
        {/* ... form input tidak berubah ... */}
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base text-black placeholder:text-grey outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base text-black placeholder:text-grey outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base text-black placeholder:text-grey outline-none focus:border-primary"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-18 font-medium text-white border border-transparent bg-gradient-to-r from-[#4A3AFF] to-[#9192EF] hover:opacity-90 flex items-center justify-center"
          >
            {loading ? <Loader /> : "Sign Up"}
          </button>
        </div>
      </form>

      <p className="text-body-secondary mb-4 text-base text-black">
        By creating an account you agree with our{" "}
        <a href="/#" className="text-[#4A3AFF] hover:underline">
          Privacy
        </a>{" "}
        and{" "}
        <a href="/#" className="text-[#4A3AFF] hover:underline">
          Policy
        </a>
      </p>

      <p className="mb-2 text-base font-medium text-[#4A3AFF]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-[#4A3AFF] font-medium hover:underline"
        >
          Sign In
        </button>
      </p>
    </>
  );
};

export default SignUp;