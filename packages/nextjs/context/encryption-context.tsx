"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import forge from "node-forge"

interface EncryptionContextType {
  publicKey: string
  setPublicKey: (key: string) => void
  privateKey: string
  setPrivateKey: (key: string) => void
  secretMessage: string
  setSecretMessage: (message: string) => void
  encryptedMessage: string | null
  setEncryptedMessage: (message: string | null) => void
  decryptedMessage: string | null
  setDecryptedMessage: (message: string | null) => void
  genKeyPair: () => void
  encryptWithPublicKey: (message: string) => void
  decryptWithPrivateKey: () => void
}

const EncryptionContext = createContext<EncryptionContextType | undefined>(undefined)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function EncryptionProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string>("")
  const [privateKey, setPrivateKey] = useState<string>("")
  const [secretMessage, setSecretMessage] = useState<string>("Super secret message")
  const [encryptedMessage, setEncryptedMessage] = useState<string | null>(null)
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null)

  // Function to generate an RSA key pair using node-forge
  const genKeyPair = () => {
    const { privateKey: privKey, publicKey: pubKey } = forge.pki.rsa.generateKeyPair(2048)

    const privatePem = forge.pki.privateKeyToPem(privKey)
    const publicPem = forge.pki.publicKeyToPem(pubKey)

    setPrivateKey(privatePem)
    setPublicKey(publicPem)

    console.log("Generated Public Key:", publicPem)
    console.log("Generated Private Key:", privatePem)
  }

  // Function to encrypt the secret message using the public key
  const encryptWithPublicKey = (message: string) => {
    const pubKey = forge.pki.publicKeyFromPem(publicKey)
    const encrypted = pubKey.encrypt(forge.util.encodeUtf8(message))

    setEncryptedMessage(forge.util.encode64(encrypted))
    console.log("Encrypted Message:", forge.util.encode64(encrypted))
  }

  // Function to decrypt the message using the private key
  const decryptWithPrivateKey = () => {
    if (!encryptedMessage) {
      console.error("No encrypted message to decrypt")
      return
    }
    const privKey = forge.pki.privateKeyFromPem(privateKey)
    const decrypted = privKey.decrypt(forge.util.decode64(encryptedMessage))

    setDecryptedMessage(forge.util.decodeUtf8(decrypted))
    console.log("Decrypted Message:", forge.util.decodeUtf8(decrypted))
  }

  const value = {
    publicKey,
    setPublicKey,
    privateKey,
    setPrivateKey,
    secretMessage,
    setSecretMessage,
    encryptedMessage,
    setEncryptedMessage,
    decryptedMessage,
    setDecryptedMessage,
    genKeyPair,
    encryptWithPublicKey,
    decryptWithPrivateKey,
  }

  return <EncryptionContext.Provider value={value}>{children}</EncryptionContext.Provider>
}

export function useEncryption() {
  const context = useContext(EncryptionContext)
  if (context === undefined) {
    throw new Error("useEncryption must be used within an EncryptionProvider")
  }
  return context
}
