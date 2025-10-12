"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import KeluhKesahPopup from "@/components/Home/KeluhKesahPopUP";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const getExcerpt = (html: string, maxLength = 100) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.textContent || temp.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const StoryCard = ({
  story,
  onLike,
  onOpenDetail,
  isLiked,
}: {
  story: any;
  onLike: (id: number) => void;
  onOpenDetail: (story: any) => void;
  isLiked: boolean;
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-gray-400">JIWABELAJAR.ID</span>
      </div>
      <div className="flex-grow">
        <h3
          className="font-bold text-lg text-gray-800 truncate mb-1 cursor-pointer hover:text-indigo-600"
          onClick={() => onOpenDetail(story)}
        >
          {story.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {getExcerpt(story.content, 80)}
        </p>
      </div>
      <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => onLike(story.id)}
          className={`flex items-center gap-2 transition ${
            isLiked ? "text-indigo-600" : "text-gray-500 hover:text-indigo-500"
          }`}
        >
          <Icon icon={isLiked ? "mdi:account-multiple" : "mdi:account-multiple-outline"} width="20" />
          <span className="text-sm">{story.likes}</span>
        </button>
      </div>
    </div>
  );
};

const KeluhKesah = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [stories, setStories] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);
  const [userLikes, setUserLikes] = useState<number[]>([]);

  const fetchStories = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("stories")
      .select(`*, likes(count)`)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Gagal mengambil cerita:", error);
      setStories([]);
      return;
    }
    const formattedStories = data.map(story => ({
        ...story,
        likes: story.likes[0]?.count || 0,
    }));
    setStories(formattedStories);
    if (user && data) {
      const storyIds = data.map(s => s.id);
      const { data: likesData, error: likesError } = await supabase
        .from("likes").select("story_id").eq("user_id", user.id).in("story_id", storyIds);
      if (likesError) console.error("Gagal mengambil data likes:", likesError);
      else setUserLikes(likesData?.map(l => l.story_id) || []);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [user]);

  const handleSave = async (title: string, content: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("stories").insert([{ title, content, user_id: user?.id }]);
    if (error) { console.error("Gagal menyimpan cerita:", error); return; }
    setIsPopupOpen(false);
    fetchStories();
  };

  const handleToggleLike = async (storyId: number) => {
    if (!user) { router.push("/signin"); return; }
    const supabase = createClient();
    const isCurrentlyLiked = userLikes.includes(storyId);
    if (isCurrentlyLiked) {
      setUserLikes(userLikes.filter(id => id !== storyId));
      setStories(stories.map(s => s.id === storyId ? {...s, likes: s.likes - 1} : s));
      await supabase.from("likes").delete().match({ user_id: user.id, story_id: storyId });
    } else {
      setUserLikes([...userLikes, storyId]);
      setStories(stories.map(s => s.id === storyId ? {...s, likes: s.likes + 1} : s));
      await supabase.from("likes").insert({ user_id: user.id, story_id: storyId });
    }
  };
  
  const handleOpenPopup = () => {
    if (!user) { router.push("/signin"); } else { setIsPopupOpen(true); }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F8FBFF] to-[#E8EEFF] pt-24 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Banner */}
        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-8 mb-8 flex items-center justify-center shadow-md">
          <div className="absolute left-6 bottom-0 hidden md:block w-40 h-40">
            <Image src="/images/banner/Picture2.png" alt="Left illustration" fill className="object-contain" />
          </div>
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-3">Punya Cerita Hari Ini?</h1>
            <p>Tuangkan apa saja yang ada di pikiranmu. Di sini, semua ceritamu punya tempat untuk didengar.</p>
          </div>
          <div className="absolute right-6 bottom-0 hidden md:block w-36 h-36">
            <Image src="/images/banner/Picture1.png" alt="Right illustration" fill className="object-contain" />
          </div>
        </div>

        {/* Tombol */}
        <div className="flex justify-center mb-8">
          <button onClick={handleOpenPopup} className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 shadow-md hover:opacity-90 transition-all duration-300">
            <Icon icon="heroicons:plus-solid" width="20" /> Tulis Keluh Kesahmu
          </button>
        </div>

        {/* Kartu */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} onLike={handleToggleLike} onOpenDetail={(s) => setSelectedStory(s)} isLiked={userLikes.includes(story.id)} />
            ))}
          </div>
        </div>

        <KeluhKesahPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onSave={handleSave} />
        
        {/* ✅ DIKEMBALIKAN: Konten Popup Detail Cerita */}
        {selectedStory && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelectedStory(null)}>
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-3">{selectedStory.title}</h2>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed mb-6 max-h-[50vh] overflow-y-auto" dangerouslySetInnerHTML={{ __html: selectedStory.content }} />
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => handleToggleLike(selectedStory.id)} className={`flex items-center gap-2 transition ${userLikes.includes(selectedStory.id) ? "text-indigo-600" : "text-gray-500 hover:text-indigo-500"}`}>
                  <Icon icon={userLikes.includes(selectedStory.id) ? "mdi:account-multiple" : "mdi:account-multiple-outline"} width="20" />
                  <span>{selectedStory.likes}</span>
                </button>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setSelectedStory(null)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Tutup</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default KeluhKesah;