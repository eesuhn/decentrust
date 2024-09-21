"use client"

import { Button } from "@/components/ui/button"
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

export default function WorldIDSignIn() {
  const [proof, setProof] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  useEffect(() => {
    // Check if the user is already verified by looking at localStorage
    const storedProof = localStorage.getItem("worldcoin_proof")
    if (storedProof) {
      setIsVerified(true)
    }
  }, [])

  const handleSuccess = async (result: ISuccessResult) => {
    setProof(result.proof)

    try {
      // Send proof to backend for validation
      const response = await fetch("/api/validate-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proof: result.proof,
          merkle_root: result.merkle_root,
          nullifier_hash: result.nullifier_hash,
          verification_level: result.verification_level,
        }),
      })

      const data = await response.json()
      console.log("Server response:", data)

      // Store the proof in localStorage to mark the user as verified
      if (data.success) {
        localStorage.setItem("worldcoin_proof", result.proof)
        setIsVerified(true)
      }

      return data
    } catch (error) {
      console.error("Error sending proof to backend:", error)
    }
  }

  const handleError = (error: any) => {
    console.error("Error during World ID verification:", error)
  }

  // Function to remove verification data from localStorage
  const handleRemoveVerification = () => {
    localStorage.removeItem("worldcoin_proof")
    setIsVerified(false)
    alert("Verification data removed.")
  }

  const { address: connectedAddress, isConnected } = useAccount()

  return (
    <div className="flex flex-col">
      {!isVerified && (
        <IDKitWidget
          app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_STAGING_ID as `app_staging_${string}`}
          action="login"
          onSuccess={handleSuccess}
          onError={handleError}
          verification_level={VerificationLevel.Device}
        >
          {({ open }) => (
            <Button color="bg-accent" variant={"outline"} onClick={open}>
              <Image src="/worldcoin-logo.png" alt="Worldcoin Logo" width={24} height={24} className="rounded-full" />
            </Button>
          )}
        </IDKitWidget>
      )}

      {isVerified && !connectedAddress && !connectedAddress && !isConnected && (
        <Button color="bg-red-500" variant={"outline"} onClick={handleRemoveVerification}>
          Remove <Image src="/worldcoin-logo.png" alt="Worldcoin Logo" width={24} height={12} className="ml-2 rounded-full" />
        </Button>
      )}
    </div>
  )
}
