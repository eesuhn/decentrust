import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, FileText } from "lucide-react"
import { useState } from "react"

const jobListings = [
  { name: "Full Stack Developer" },
  {
    name: "DevOps Engineer",
  },
  { name: "Cybersecurity Analyst" },
]

export default function DashboardWidget() {
  const [showApplicant, setShowApplicants] = useState(false)
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Job listings</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {jobListings.map((jobListing, index) => (
            <li key={index} className="group">
              <Button variant="ghost" className="w-full justify-start text-left hover:bg-secondary" onClick={() => setShowApplicants(!showApplicant)}>
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
  )
}
