import { NextRequest, NextResponse } from "next/server"

// const WORLDCOIN_API_URL = `https://developer.worldcoin.org/api/v2/verify/${process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID}`
const WORLDCOIN_API_URL = `https://developer.worldcoin.org/api/v2/verify/${process.env.NEXT_PUBLIC_WORLDCOIN_APP_STAGING_ID}`

export async function POST(req: NextRequest) {
  const { proof, merkle_root, nullifier_hash, verification_level } = await req.json()

  try {
    const response = await fetch(WORLDCOIN_API_URL, {
      method: "POST",
      body: JSON.stringify({
        nullifier_hash,
        proof,
        merkle_root,
        verification_level,
        action: "login",
      }),
    })

    const result = await response.json()

    console.log("worldcoin api response: ", result)

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Proof is valid",
        data: result,
      })
    } else {
      return NextResponse.json({ success: false, message: "Invalid proof", data: result }, { status: 400 })
    }
  } catch (error) {
    console.log("error", error)

    return NextResponse.json({ success: false, message: "Error validating proof", error }, { status: 500 })
  }
}
