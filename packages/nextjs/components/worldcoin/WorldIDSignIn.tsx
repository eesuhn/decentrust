"use client"

import { Button } from "@/components/ui/button"
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit"
import Image from "next/image"
import { useState } from "react"

export default function WorldIDSignIn() {
  const [proof, setProof] = useState<string | null>(null)

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
      return data
    } catch (error) {
      console.error("Error sending proof to backend:", error)
    }
  }

  const handleError = (error: any) => {
    console.error("Error during World ID verification:", error)
  }

  return (
    <div className="flex flex-col">
      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`}
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
    </div>
  )
}
