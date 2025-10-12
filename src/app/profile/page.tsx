"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ChangeEvent } from "react";

export default function Profile() {
  const router = useRouter();
  const { user: ctxUser, updateProfile } = useAuth();

  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (ctxUser) {
      setName(ctxUser.name);
    }
  }, [ctxUser]);

  useEffect(() => {
    if (!ctxUser) {
      const timer = setTimeout(() => {
        if (!ctxUser) router.push("/signin");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ctxUser, router]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !ctxUser) return;

    setIsUploading(true);
    try {
      await updateProfile({}, file);
      alert("Foto profil berhasil diperbarui!");
    } catch (error: any) {
      console.error("Upload error:", error.message);
      alert("Gagal mengunggah foto: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!ctxUser || name === ctxUser.name) {
      setIsEditing(false);
      return;
    }
    
    try {
      await updateProfile({ name });
      alert("Profil berhasil disimpan!");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Update profile error:", error.message);
      alert("Gagal memperbarui profil: " + error.message);
    }
  };

  const handleCancel = () => {
    if (ctxUser) {
      setName(ctxUser.name);
    }
    setIsEditing(false);
  };
  
  if (!ctxUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F2F5] flex flex-col items-center p-6">
      {/* Profil Header */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-6 flex items-center relative">
        <div className="relative">
          <img
            src={ctxUser.image || "https://via.placeholder.com/100x100.png?text=Profile"}
            alt="Profile"
            className={`w-24 h-24 rounded-full border-4 border-white object-cover transition-opacity duration-300 ${isUploading ? 'opacity-50' : 'opacity-100'}`}
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer">
              {isUploading ? "..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          )}
        </div>
        <div className="ml-6 flex-1 flex flex-col min-w-0">
          <input
            type="text"
            value={name}
            disabled={!isEditing}
            onChange={(e) => setName(e.target.value)}
            className={`text-xl font-semibold w-full border-b focus:outline-none ${ isEditing ? "border-gray-400" : "border-transparent bg-transparent" }`}
          />
          <p className="block text-gray-600 w-full truncate mt-1">
            {ctxUser.email}
          </p>
          <div className="mt-3 flex gap-2">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                Edit Profil
              </button>
            ) : (
              <>
                <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                  Simpan
                </button>
                <button onClick={handleCancel} className="px-3 py-1 bg-gray-300 text-black text-sm rounded hover:bg-gray-400">
                  Batal
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ BAGIAN YANG DIKEMBALIKAN (Tabs) */}
      <div className="bg-white w-full max-w-4xl flex justify-around mt-4 rounded-lg shadow">
        {[ "Dashboard", "Jadwal", "Kursus saya", "Riwayat chat", "Transaksi saya" ].map((tab, idx) => (
          <button key={idx} className={`flex-1 py-3 text-sm font-medium hover:text-blue-600 ${ idx === 0 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600" }`} >
            {tab}
          </button>
        ))}
      </div>

      {/* ✅ BAGIAN YANG DIKEMBALIKAN (Content) */}
      <div className="bg-white w-full max-w-4xl mt-6 rounded-lg shadow p-8 min-h-[400px]">
        {/* Di sini Anda bisa menampilkan konten sesuai tab yang aktif */}
        <p>Konten Dashboard...</p>
      </div>

    </main>
  );
}