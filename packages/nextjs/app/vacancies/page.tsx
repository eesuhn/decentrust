"use client"

import Banner from "@/components/Banner"
import CollapsibleCard from "@/components/CollapsibleCard"

const VacanciesPage = ({}) => {
  return (
    <>
      <div className="relative flex h-full w-full flex-grow flex-col items-center bg-white pt-10">
        <div className="pb-10">
          <div className="relative z-10 space-y-6 text-center">
            <h1 className="z-10 text-5xl font-semibold tracking-wide text-primary">Job listings</h1>
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-10 flex w-3/5 flex-row space-x-24">
          <CollapsibleCard />
        </div>
        <div className="absolute inset-0 z-0">
          <Banner banner={2} />
        </div>
      </div>
    </>
  )
}

export default VacanciesPage
