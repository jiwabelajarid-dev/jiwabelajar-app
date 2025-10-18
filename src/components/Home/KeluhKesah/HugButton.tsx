import React from "react";
import Image from "next/image";

interface HugButtonProps {
  isLiked: boolean;
  likeCount: number;
  onClick: () => void;
}

const HugButton: React.FC<HugButtonProps> = ({ isLiked, likeCount, onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center gap-2 transition">
      <Image
        src="/icons/hug.png"
        alt="Hug Icon"
        width={22}
        height={22}
        className={`object-contain transition-all duration-300 ${
          isLiked
            ? "scale-110 filter invert-[55%] sepia-[90%] saturate-[700%] hue-rotate-[230deg] brightness-[100%] contrast-[90%]"
            : "filter brightness-0 invert-[50%] opacity-80 hover:opacity-100"
        }`}
      />
      <span
        className={`text-sm font-medium transition-colors ${
          isLiked ? "text-indigo-600" : "text-gray-500 hover:text-indigo-500"
        }`}
      >
        {likeCount}
      </span>
    </button>
  );
};

export default HugButton;
