"use client"

import Banner from "@/components/Banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ExternalLink, FileText, UserCheck, Users } from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const genderData = [
  { gender: "Male", count: 60 },
  { gender: "Female", count: 35 },
  { gender: "Non-binary", count: 5 },
]

const hiringData = [
  { status: "Passed Assessment", count: 70 },
  { status: "Hired", count: 20 },
]

const companyInfo = {
  name: "TechNova Solutions",
  description:
    "TechNova Solutions is a cutting-edge technology company specializing in AI-driven software development and cloud infrastructure. We're committed to pushing the boundaries of innovation while fostering a diverse and inclusive work environment.",
  website: "https://www.technovasolutions.com",
}

const jobListings = [{ name: "Full Stack Developer" }, { name: "DevOps Engineer" }, { name: "Cybersecurity Analyst" }]

const CompanyPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  return (
    <div className="relative flex h-full min-h-screen flex-grow flex-col items-center bg-white pt-10">
      <div className="absolute inset-0 z-0">
        <Banner banner={1} />
      </div>
      <div className="z-10 w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="relative z-10 flex flex-row space-y-6 text-center">
          <h1 className="z-10 pb-10 text-4xl font-semibold tracking-wide text-primary sm:text-5xl">{companyInfo.name}</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{companyInfo.name}</h3>
                <p className="text-sm text-gray-600">{companyInfo.description}</p>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-blue-500" />
                  <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                    Visit our website
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Job Listings</CardTitle>
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
                        <FileText className="h-5 w-5 text-blue-500 group-hover:text-white" />
                        <span className="flex-grow text-sm font-medium group-hover:text-white">{jobListing.name}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-white" />
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{selectedJob ? `Applicants for ${selectedJob}` : "Company Statistics"}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedJob ? (
                <p className="text-center text-gray-500">Select an applicant to view details</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-4">
                    <Users className="h-10 w-10 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-sm text-gray-500">Total Employees</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <UserCheck className="h-10 w-10 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-sm text-gray-500">Retention Rate</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={genderData}>
                  <XAxis dataKey="gender" />
                  <YAxis />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Hiring Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={hiringData}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CompanyPage
