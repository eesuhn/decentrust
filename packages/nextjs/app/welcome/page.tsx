"use client"

import { useState } from "react"
import Banner from "@/components/Banner"
import WelcomeCard from "@/components/WelcomeCard"

const WelcomePage = () => {
  // Dummy company data
  const [companies] = useState([
    { id: 1, name: "TechCorp" },
    { id: 2, name: "InnoSystems" },
    { id: 3, name: "DataDynamics" },
  ])

  return (
    <div className="relative flex h-full w-full flex-grow flex-col items-center bg-white pt-28">
      <div className="pb-10">
        <div className="relative z-10 space-y-6 text-center">
          <h1 className="z-10 text-7xl font-semibold tracking-wide text-primary">
            Decen<span className="text-accent">TRUST</span>
          </h1>
          <h3 className="text-2xl text-secondary">Decentralised Transparent Recruitment Under Secure Technology</h3>
        </div>
        <div className="absolute inset-0 z-0">
          <Banner banner={1} />
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-10 flex flex-row space-x-24">
        <WelcomeCard title="applicant" />
        <WelcomeCard title="company" />
      </div>
    </div>
  )
}

export default WelcomePage
