"use client"

import ApplicantsTable from "@/components/ApplicantsTable"
import Banner from "@/components/Banner"
import CalendarWidget from "@/components/Calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, FileText, Users } from "lucide-react"
import { useState } from "react"

const DashboardPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const jobListings = [{ name: "Full Stack Developer" }, { name: "DevOps Engineer" }, { name: "Cybersecurity Analyst" }]

  return (
    <div className="relative flex h-full flex-grow flex-col items-center bg-white pt-10">
      <div className="absolute inset-0 z-0">
        <Banner banner={1} />
      </div>
      <div className="w-4/5 pb-10">
        <div className="relative z-10 space-y-6 text-center">
          <h1 className="z-10 pb-10 text-5xl font-semibold tracking-wide text-primary">Dashboard</h1>
        </div>
        <div className="flex flex-row space-x-6">
          <div className="relative z-10 flex w-1/3 flex-col space-y-6">
            <Card className="mx-auto w-[390px]">
              <CardHeader className="text-center">
                <CardTitle>Job listings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {jobListings.map((jobListing, index) => (
                    <li key={index} className="group">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left hover:bg-secondary"
                        onClick={() => setSelectedJob(jobListing.name)}
                      >
                        <div className="flex w-full items-center space-x-3">
                          <div className="flex-shrink-0">
                            <FileText className="h-5 w-5 text-blue-500 group-hover:text-white" />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-medium group-hover:text-white">{jobListing.name}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-white" />
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <CalendarWidget />
          </div>
          <div className="relative z-20 w-2/3">
            <Card className="h-[600px]">
              <CardHeader className="text-center">
                <CardTitle>{selectedJob || "Please select a job posting to view applicants"}</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)]">
                {selectedJob ? (
                  <ApplicantsTable />
                ) : (
                  <div className="flex h-[500px] items-center justify-center text-muted-foreground">
                    <Users color="#cfcfcf" className="h-20 w-20" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
