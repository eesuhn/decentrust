"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const CodeEditor = ({ value }: { value: string }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  return (
    <textarea
      ref={textareaRef}
      className="h-64 w-full rounded-md border bg-gray-100 p-4 font-mono text-sm text-black focus:border-2 focus:border-primary focus:outline-none focus:ring-0"
      value={value}
      readOnly
    />
  )
}

export default function AssessmentPage() {
  const [showResults, setShowResults] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [code, setCode] = useState(`function revealWinner(signature, contract) {
    const isValid = signature === "0xETHSingapore";
    const winner = contract.winner || "No winner yet";
    return isValid ? \`The winner is... \${winner}!\` : "Invalid contract. Try again.";
  }
  const contract = { winner: "decenTRUST" };
  const signature = "0xETHSingapore";
  console.log(revealWinner(signature, contract)); // Who will win? 🏆`)
  const totalQuestions = 1
  const progress = (currentQuestion / totalQuestions) * 100

  const router = useRouter()

  const applicantData = {
    name: "Betty Bus",
    gender: "Female",
    linkedIn: "https://www.linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    resume: "https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf",
    assessment: {
      question:
        "A smart contract has recorded the winner of the ETHSingapore hackathon. Let's write a function that reveals the winner, but first, we need to validate the contract!",
      answer: `function revealWinner(signature, contract) {
    const isValid = signature === "0xETHSingapore";
    const winner = contract.winner || "No winner yet";
    return isValid ? \`The winner is... \${winner}!\` : "Invalid contract. Try again.";
  }
  const contract = { winner: "decenTRUST" };
  const signature = "0xETHSingapore";
  console.log(revealWinner(signature, contract)); // Who will win?`,
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // ENCRYPT AND SUBMIT DATA HERE
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Redirect to /company
    router.push("/company")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-primary">Fullstack Engineer Assessment</h1>
          <p className="text-gray-600">Complete the coding challenges to proceed</p>
        </header>
        {!showResults ? (
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Question {currentQuestion}</CardTitle>
              <div className="flex items-center space-x-2 text-primary">
                <ClockIcon className="h-5 w-5" />
                <span className="text-xl font-semibold">13:00</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-gray-100 p-4">
                <h3 className="mb-2 font-semibold">Problem:</h3>
                <p>
                  A smart contract has recorded the winner of the ETHSingapore hackathon. Let's write a function that reveals the winner, but first, we
                  need to validate the contract!
                </p>
              </div>
              <p>Your code: </p>
              <CodeEditor value={code} />
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Console Output:</h4>
                <div className="rounded-md">
                  <pre className="font-mono text-green-400">The winner is... decenTRUST!</pre>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentQuestion((prev) => Math.max(1, prev - 1))} disabled={currentQuestion === 1}>
                <ChevronLeftIcon className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={() => setShowResults(true)}>
                Submit <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Assessment Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex aspect-video items-center justify-center rounded-md bg-gray-200">
                <span className="text-gray-500">
                  <Image src={`/assessment-result.png`} alt="assessment results" width={500} height={900} />
                </span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={applicantData.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select disabled>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder={applicantData.gender} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input id="linkedin" type="url" value={applicantData.linkedIn} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input id="github" type="url" value={applicantData.github} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume Link</Label>
                  <Input id="resume" type="url" value={applicantData.resume} readOnly />
                </div>
                <Button type="submit" className="w-full">
                  Encrypt and submit data
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>
              {currentQuestion} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </div>
    </div>
  )
}
