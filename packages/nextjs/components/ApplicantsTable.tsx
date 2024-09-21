import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

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

  return (
    <>
      <Card className="mx-auto my-6 w-full shadow-md">
        <CardHeader>
          <CardTitle className="text-center">Full Stack Developer</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <td>
                    <Button variant="outline" size="sm" onClick={() => handleDecrypt(applicant.data)}>
                      Decrypt
                    </Button>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decrypted Data</DialogTitle>
          </DialogHeader>
          <div className="py-4">DECRYPTED DATA</div>
          <DialogFooter className="sm:justify-between">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => console.log("HIREDDDD")}>Hire Applicant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
