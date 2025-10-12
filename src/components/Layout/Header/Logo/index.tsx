import { getImagePrefix } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src= {`${getImagePrefix()}images/logo/logoJBid.svg`}
        alt="logo"
        width={160}
        height={50}
        style={{ width: "300px", height: "auto" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
