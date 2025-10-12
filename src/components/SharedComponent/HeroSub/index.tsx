import React, { FC } from "react";

interface HeroSubProps {
    title: string;
    pesan: string;
}

const HeroSub: FC<HeroSubProps> = ({ title, pesan }) => {

    return (
        <>
            <section className="py-40 bg-herosub-bg bg-no-repeat bg-cover lg:mt-40 sm:mt-44 mt-20">
                <div className="container mx-auto lg:max-w-screen-xl px-4">
                    <h1 className="text-center text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#4A3AFF] to-[#9192EF] bg-clip-text text-transparent">
                        {title}
                    </h1>
                    <h1 className="text-center text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-[#4A3AFF] to-[#9192EF] bg-clip-text text-transparent mt-6">
                        {pesan}
                    </h1>
                </div>
            </section>
        </>
    );
};

export default HeroSub;