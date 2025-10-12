import HeroSub from "@/components/SharedComponent/HeroSub";
import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JiwaBelajar",
};

const ErrorPage = () => {
  return (
    <>
      <HeroSub
        title="COMING SOON"
        pesan="Konseling akan segera hadir, pantau terus yaaa!"
      />
      <NotFound />
    </>
  );
};

export default ErrorPage;
