import React from "react";
import { Story } from "@/types/story";
import HugButton from "./HugButton";


const getExcerpt = (html: string, maxLength = 80) => {
  if (typeof window === "undefined") return ""; 
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.textContent || temp.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

interface StoryCardProps {
  story: Story;
  onLike: (id: number) => void;
  onOpenDetail: (story: Story) => void;
  isLiked: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onLike, onOpenDetail, isLiked }) => {
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
          {getExcerpt(story.content)}
        </p>
      </div>
      <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-100">
        <HugButton
          isLiked={isLiked}
          likeCount={story.likes}
          onClick={() => onLike(story.id)}
        />
      </div>
    </div>
  );
};

export default StoryCard;
