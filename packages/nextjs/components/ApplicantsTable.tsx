"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Lottie from "lottie-react"
import { useState } from "react"
import hiringAnimation from "../public/handshake.json" // Make sure this path is correct
import { Button } from "./ui/button"

type TableData = {
  applicant: string
  timeDate: string
  data: string
}

const applicantData: TableData[] = [
  { applicant: "0x1234...5678", timeDate: "2023-05-20 14:30", data: "Encrypted data 1" },
  { applicant: "0xabcd...ef01", timeDate: "2023-05-21 09:15", data: "Encrypted data 2" },
  { applicant: "0x9876...5432", timeDate: "2023-05-22 16:45", data: "Encrypted data 3" },
]

export default function ApplicantsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHiring, setIsHiring] = useState(false)

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

  const handleDecrypt = (data: string) => {
    // Implement your decryption logic here
    setIsModalOpen(true)
  }

  const handleHire = () => {
    setIsHiring(true)
    setTimeout(() => {
      setIsHiring(false)
      setIsModalOpen(false)
    }, 20000)
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isHiring ? "Hiring Applicant" : "Decrypted Data"}</DialogTitle>
          </DialogHeader>
          {isHiring ? (
            <div className="flex items-center justify-center py-4">
              <Lottie animationData={hiringAnimation} style={{ width: 400, height: 400 }} />
            </div>
          ) : (
            <div className="py-4">DECRYPTED DATA</div>
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
