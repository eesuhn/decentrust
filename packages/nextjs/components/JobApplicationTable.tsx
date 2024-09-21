import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2Icon, ClockIcon, XCircleIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface JobApplication {
  vacancy: string
  dateTime: string
  result: number
  status: "Pending" | "Invited" | "Rejected"
}

const jobApplications: JobApplication[] = [
  { vacancy: "Software Engineer", dateTime: "2023-06-15T10:30:00", result: 85, status: "Invited" },
  { vacancy: "Product Manager", dateTime: "2023-06-14T14:45:00", result: 72, status: "Pending" },
  { vacancy: "UX Designer", dateTime: "2023-06-13T09:15:00", result: 54, status: "Rejected" },
  { vacancy: "Data Analyst", dateTime: "2023-06-12T16:20:00", result: 78, status: "Invited" },
  { vacancy: "Marketing Specialist", dateTime: "2023-06-11T11:00:00", result: 68, status: "Pending" },
]

export default function JobApplicationTable() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: JobApplication["status"]) => {
    switch (status) {
      case "Invited":
        return <CheckCircle2Icon className="h-4 w-4 text-white" />
      case "Rejected":
        return <XCircleIcon className="h-4 w-4 text-white" />
      case "Pending":
        return <ClockIcon className="h-4 w-4 text-white" />
    }
  }

  return (
    <Card className="mx-auto my-6 w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-center">Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vacancy</TableHead>
              <TableHead>Time/Date</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobApplications.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{job.vacancy}</TableCell>
                <TableCell>{formatDate(job.dateTime)}</TableCell>
                <TableCell>{job.result}%</TableCell>
                <TableCell>
                  <Badge
                    variant={job.status === "Invited" ? "secondary" : job.status === "Rejected" ? "destructive" : "default"}
                    className="flex items-center gap-1"
                  >
                    {getStatusIcon(job.status)}
                    {job.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
