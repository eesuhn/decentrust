"use client"

import { Button } from "@/components/ui/button"
import crypto from "crypto"
import type { NextPage } from "next"
import { useState } from "react"
import { useAccount } from "wagmi"

const EncryptionPage: NextPage = () => {
  const { address: connectedAddress } = useAccount()
  const [companyPublicKey, setCompanyPublicKey] = useState<string | null>(null)
  const [encryptedData, setEncryptedData] = useState<any>(null)
  const [publicKey, setPublicKey] = useState<string>("")
  const [privateKey, setPrivateKey] = useState<string>("")
  const [secretMessage, setSecretMessage] = useState<string>("Super secret message")

  function genKeyPair() {
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKey("RSA-PSS", {
      modulusLength: 4096, // bits - standard for RSA keys
      publicKeyEncoding: {
        type: "pkcs1", // "Public Key Cryptography Standards 1"
        format: "pem", // Most common formatting choice
      },
      privateKeyEncoding: {
        type: "pkcs1", // "Public Key Cryptography Standards 1"
        format: "pem", // Most common formatting choice
      },
    })
    console.log("1", keyPair.publicKey)
    console.log("2", keyPair.privateKey)

    // Create the public key file
    setPublicKey(keyPair.publicKey)

    // fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey)

    // Create the private key file
    // fs.writeFileSync(__dirname + "/id_rsa_priv.pem", keyPair.privateKey)
    setPrivateKey(keyPair.privateKey)

    const encryptedMessageText = encryptWithPublicKey(publicKey, "secretMessage")

    console.log("encryptedMessageText", encryptedMessageText)

    const decryptedMessageText = crypto.privateDecrypt(privateKey, "encryptedMessageText")
    console.log(decryptedMessageText)
  }

  // Generates the keypair
  // genKeyPair()

  function encryptWithPublicKey(publicKey: string, message: string) {
    const bufferMessage = Buffer.from(message, "utf8")

    // console.log(crypto.publicEncrypt(publicKey, bufferMessage))
  }

  // Stores a Buffer object
  const encryptedMessage = encryptWithPublicKey(publicKey!, "Super secret message")

  // console.log(encryptedMessage.toString());

  return (
    <div>
      <h1>Data Encryption </h1>
      <Button onClick={genKeyPair}> genKeyPair </Button>
    </div>
  )
}

export default EncryptionPage
