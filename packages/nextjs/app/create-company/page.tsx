"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RefreshCw } from "lucide-react"
import { useEncryption } from "@/context/encryption-context"
import toast from "react-hot-toast"
import { useScaffoldWriteContract } from "@/hooks/scaffold-eth"

const CreateCompanyPage = () => {
  const { address: connectedAddress } = useAccount()
  const { keyPairs, currentKeyPairId, genKeyPair } = useEncryption()

  const [formData, setFormData] = useState({
    publicKey: "",
    name: "",
  })


  const { writeContractAsync: writeYourContractAsync, status } = useScaffoldWriteContract("CompanyFactory")


  const sendDateToSmartContract = async () => {
    try {
      await writeYourContractAsync({
        functionName: "createCompany",
        args: [formData.publicKey, formData.name],
      })
    } catch (e) {
      console.error("Error setting greeting:", e)
    }
  }

  useEffect(() => {
    if (currentKeyPairId) {
      const currentKeyPair = keyPairs.get(currentKeyPairId)
      if (currentKeyPair) {
        setFormData((prevState) => ({
          ...prevState,
          publicKey: currentKeyPair.publicKey,
        }))
      }
    }
  }, [currentKeyPairId, keyPairs])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendDateToSmartContract();
  }

  const handleGenerateKeyPair = () => {
    genKeyPair()
  }

  return (
    <div className="container mx-auto mt-10">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Company Profile</CardTitle>
          <CardDescription>Enter your company details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="publicKey">Public Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="publicKey"
                    name="publicKey"
                    value={formData.publicKey}
                    onChange={handleInputChange}
                    placeholder="Public Key"
                    required
                    readOnly
                  />
                  <Button type="button" variant="outline" size="icon" onClick={handleGenerateKeyPair}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter company name" required />
              </div>
            </div>
            <CardFooter className="mt-4 flex justify-end p-0">
              <Button type="submit" disabled={status === "pending"}>
                {status === "pending" ? "Creating..." : "Create Company"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      {connectedAddress && (
        <Alert className="mt-4">
          <AlertTitle>Connected Address</AlertTitle>
          <AlertDescription>{connectedAddress}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default CreateCompanyPage
