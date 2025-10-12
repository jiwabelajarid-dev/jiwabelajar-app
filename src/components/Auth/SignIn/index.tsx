"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialLogin from "../SosialLogin";
import Logo from "@/components/Layout/Header/Logo";
import Loader from "@/components/Common/Loader";
import { createClient } from "@/utils/supabase/client";

type SigninProps = {
  onSwitchToSignUp?: () => void;
  onClose?: () => void;
};


const Signin = ({ onSwitchToSignUp, onClose }: SigninProps) => {
  const router = useRouter();
  const supabase = createClient();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      if (onClose) {
        onClose();
      }
      router.replace("/profile");
    }

    setLoading(false);
  };

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

      <form onSubmit={loginUser}>
        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base text-black placeholder:text-grey outline-none focus:border-primary"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base text-black placeholder:text-grey outline-none focus:border-primary"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-18 font-medium text-white border border-transparent bg-gradient-to-r from-[#4A3AFF] to-[#9192EF] hover:opacity-90 flex items-center justify-center"
          >
            {loading ? <Loader /> : "Sign In"}
          </button>
        </div>
      </form>

      <Link
        href="/forgot-password"
        onClick={onClose}
        className="mb-2 inline-block text-base font-medium text-[#4A3AFF] hover:underline"
      >
        Forgot Password?
      </Link>

      <p className="mb-2 text-base font-medium text-[#4A3AFF]">
        Not a member yet?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-[#4A3AFF] font-medium hover:underline"
        >
          Sign Up
        </button>
      </p>
    </>
  );
};

export default Signin;