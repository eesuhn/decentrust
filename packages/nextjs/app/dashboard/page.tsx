"use client"

import Banner from "@/components/Banner"
import CalendarWidget from "@/components/Calendar"
import DashboardWidget from "@/components/DashboardWidget"
import JobApplicationTable from "@/components/JobApplicationTable"

const DashboardPage = ({}) => {
  return (
    <>
      <div className="relative flex h-full flex-grow flex-col items-center bg-white pt-10">
        <div className="absolute inset-0 z-0">
          <Banner banner={1} />
        </div>
        <div className="w-3/5 pb-10">
          <div className="relative z-10 space-y-6 text-center">
            <h1 className="z-10 pb-10 text-5xl font-semibold tracking-wide text-primary">Dashboard</h1>
          </div>
          <div>
            <div className="relative z-10 flex w-full space-x-10">
              <DashboardWidget type="documents" />
              <CalendarWidget />
              <DashboardWidget type="badges" />
            </div>
            <div className="relative z-20">
              <JobApplicationTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage