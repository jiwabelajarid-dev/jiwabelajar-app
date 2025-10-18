import React from "react";
import { Story } from "@/types/story";
import HugButton from "./HugButton";

interface StoryDetailPopupProps {
  story: Story | null;
  onClose: () => void;
  onLike: (id: number) => void;
  isLiked: boolean;
}

const StoryDetailPopup: React.FC<StoryDetailPopupProps> = ({ story, onClose, onLike, isLiked }) => {
  if (!story) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">{story.title}</h2>
        <div
          className="prose prose-sm max-w-none text-gray-600 leading-relaxed mb-6 max-h-[50vh] overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />
        <div className="flex justify-between items-center mb-4">
          <HugButton
            isLiked={isLiked}
            likeCount={story.likes}
            onClick={() => onLike(story.id)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPopup;
