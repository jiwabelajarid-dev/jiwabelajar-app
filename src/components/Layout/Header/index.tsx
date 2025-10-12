"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // ✨ DITAMBAHKAN
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client"; // ✨ DITAMBAHKAN

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const router = useRouter(); // ✨ DITAMBAHKAN
  const { theme, setTheme } = useTheme();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const { user } = useAuth(); // ✅ DIUBAH: Hapus 'logout' dari sini
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error: any) {
      console.error("Gagal logout:", error.message);
      alert("Gagal untuk logout: " + error.message);
    }
  };

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (signInRef.current && !signInRef.current.contains(event.target as Node)) {
      setIsSignInOpen(false);
    }
    if (signUpRef.current && !signUpRef.current.contains(event.target as Node)) {
      setIsSignUpOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  return (
    <header
      className={`${
        pathUrl === "/KeluhKesah" || pathUrl === "/profile"
          ? "relative"
          : "fixed top-0 z-40"
      } w-full transition-all duration-300 bg-white ${
        sticky ? "shadow-lg py-5" : "shadow-none py-6"
      }`}
    >
      <div className="lg:py-0 py-2">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
          <Logo />
          <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>

          {/* 🔹 Bagian kanan header */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="#"
                  className="hidden lg:block bg-primary text-white hover:bg-primary/15 hover:text-primary px-16 py-5 rounded-full text-lg font-medium"
                  onClick={() => setIsSignInOpen(true)}
                >
                  Sign In
                </Link>
                {isSignInOpen && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                    <div
                      ref={signInRef}
                      className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 text-center bg-white"
                    >
                      <button
                        onClick={() => setIsSignInOpen(false)}
                        className="absolute top-0 right-0 mr-8 mt-8 dark:invert"
                        aria-label="Close Sign In Modal"
                      >
                        <Icon
                          icon="tabler:x" 
                          className="text-black hover:text-primary text-2xl"
                        />
                      </button>
                      <Signin
                        onSwitchToSignUp={() => {
                          setIsSignInOpen(false);
                          setIsSignUpOpen(true);
                        }}
                        onClose={() => setIsSignInOpen(false)} 
                      />
                    </div>
                  </div>
                )}
                <Link
                  href="#"
                  className="hidden lg:block bg-primary/15 hover:bg-primary text-primary hover:text-white px-16 py-5 rounded-full text-lg font-medium"
                  onClick={() => setIsSignUpOpen(true)}
                >
                  Sign Up
                </Link>
                {isSignUpOpen && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                    <div
                      ref={signUpRef}
                      className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white backdrop-blur-md px-8 pt-14 pb-8 text-center"
                    >
                      <button
                        onClick={() => setIsSignUpOpen(false)}
                        className="absolute top-0 right-0 mr-8 mt-8 dark:invert"
                        aria-label="Close Sign Up Modal"
                      >
                        <Icon
                           icon="tabler:x" 
                           className="text-black hover:text-primary text-2xl"
                        />
                      </button>
                      <SignUp
                        onSwitchToSignIn={() => {
                          setIsSignUpOpen(false);
                          setIsSignInOpen(true);
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center text-black font-bold">
                        {user.name?.[0]?.toUpperCase() || "J"}
                      </div>
                    )}

                    <div className="text-left hidden lg:block">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </button>

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout(); 
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;