"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Lottie from "lottie-react"
import { FileText, Github, Linkedin, User } from "lucide-react"
import { useState } from "react"
import hiringAnimation from "../public/handshake.json"
import { Button } from "./ui/button"

type TableData = {
  applicant: string
  timeDate: string
  data: {
    name: string
    gender: string
    linkedIn: string
    github: string
    resume: string
  }
}

const applicantData: TableData[] = [
  {
    applicant: "0x1234...5678",
    timeDate: "2023-05-20 14:30",
    data: {
      name: "Betty Bus",
      gender: "Female",
      linkedIn: "https://www.linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      resume: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
    },
  },
  {
    applicant: "0xabcd...ef01",
    timeDate: "2023-05-21 09:15",
    data: {
      name: "John Doe",
      gender: "Male",
      linkedIn: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      resume: "https://example.com/johndoe-resume.pdf",
    },
  },
  {
    applicant: "0x9876...5432",
    timeDate: "2023-05-22 16:45",
    data: {
      name: "Alice Smith",
      gender: "Female",
      linkedIn: "https://www.linkedin.com/in/alicesmith",
      github: "https://github.com/alicesmith",
      resume: "https://example.com/alicesmith-resume.pdf",
    },
  },
]

export default function ApplicantsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHiring, setIsHiring] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<TableData["data"] | null>(null)

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

  const handleDecrypt = (data: TableData["data"]) => {
    setSelectedApplicant(data)
    setIsModalOpen(true)
  }

  const handleHire = () => {
    setIsHiring(true)
    setTimeout(() => {
      setIsHiring(false)
      setIsModalOpen(false)
    }, 5000)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Time/Date</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicantData.map((applicant, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{applicant.applicant}</TableCell>
              <TableCell>{formatDate(applicant.timeDate)}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleDecrypt(applicant.data)}>
                  Decrypt
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isHiring ? "Hiring Applicant" : "Decrypted Data"}</DialogTitle>
          </DialogHeader>
          {isHiring ? (
            <div className="flex items-center justify-center py-4">
              <Lottie animationData={hiringAnimation} style={{ width: 400, height: 400 }} />
            </div>
          ) : (
            selectedApplicant && (
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">{selectedApplicant.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span>{selectedApplicant.gender}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-5 w-5 text-blue-500" />
                  <a href={selectedApplicant.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Github className="h-5 w-5 text-gray-700" />
                  <a href={selectedApplicant.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    GitHub Profile
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <a href={selectedApplicant.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Resume
                  </a>
                </div>
              </div>
            )
          )}
          <DialogFooter className="sm:justify-between">
            <Button onClick={handleHire} disabled={isHiring}>
              {isHiring ? "Hiring..." : "Hire Applicant"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
