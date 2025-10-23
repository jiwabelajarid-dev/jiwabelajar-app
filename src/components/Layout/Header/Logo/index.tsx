import { getImagePrefix } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link 
      href="/" 
      className="relative block w-[200px] h-[50px] md:w-[300px]" 
    >
      <Image
        src={`${getImagePrefix()}images/logo/logoJBid.svg`}
        alt="logo"
        fill 
        style={{ objectFit: "contain" }} 
        quality={100}
      />
    </Link>
  );
};

export default Logo;
