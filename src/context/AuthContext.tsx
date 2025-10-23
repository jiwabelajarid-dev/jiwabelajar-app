// file: context/AuthContext.js

"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; 
import { User as SupabaseUser } from "@supabase/supabase-js"; 

type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type AuthContextType = {
  user: UserProfile | null;
  updateProfile: (newData: { name?: string }, file?: File) => Promise<void>;
  isSignInModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  isSignUpModalOpen: boolean;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  switchToSignUp: () => void;
  switchToSignIn: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<UserProfile | null>(null);

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user;
        if (currentUser) {
          const profile: UserProfile = {
            id: currentUser.id,
            name: currentUser.user_metadata?.full_name || "Pengguna",
            email: currentUser.email || "",
            image: currentUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${currentUser.email}&background=random`,
          };
          setUser(profile);
        } else {
          setUser(null);
        }
      }
    );


    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const updateProfile = async (newData: { name?: string }, file?: File) => {
    if (!user) throw new Error("User tidak ditemukan untuk update profil");

    let imageUrl = user.image; 

    if (file) {
      const filePath = `public/${user.id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("Upload gagal:", uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      imageUrl = data.publicUrl;
    }

    const dataToUpdate = {
      full_name: newData.name || user.name,
      avatar_url: imageUrl,
    };
    
    const { error: updateUserError } = await supabase.auth.updateUser({
      data: dataToUpdate,
    });

    if (updateUserError) {
      console.error("Update user gagal:", updateUserError);
      throw updateUserError;
    }

    setUser((prevUser) => ({
      ...prevUser!,
      name: dataToUpdate.full_name,
      image: dataToUpdate.avatar_url,
    }));
  };

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const switchToSignUp = () => {
    closeSignInModal();
    openSignUpModal();
  };
  const switchToSignIn = () => {
    closeSignUpModal();
    openSignInModal();
  };

  const value = {
    user,
    updateProfile,
    isSignInModalOpen,
    openSignInModal,
    closeSignInModal,
    isSignUpModalOpen,
    openSignUpModal,
    closeSignUpModal,
    switchToSignUp,
    switchToSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus digunakan di dalam AuthProvider");
  return ctx;
};
