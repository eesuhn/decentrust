"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <Image
        src="/banner-2.png"
        alt="Banner"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        className="border-4 border-black transition-all duration-300 ease-in-out dark:invert object-contain"
      />
    </>
  );
};

export default Home;
