"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import forge from "node-forge"

interface KeyPair {
  publicKey: string
  privateKey: string
}

interface EncryptionContextType {
  keyPairs: Map<string, KeyPair>
  addKeyPair: (id: string, keyPair: KeyPair) => void
  removeKeyPair: (id: string) => void
  currentKeyPairId: string | null
  setCurrentKeyPairId: (id: string | null) => void
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
  const [keyPairs, setKeyPairs] = useState<Map<string, KeyPair>>(new Map())
  const [currentKeyPairId, setCurrentKeyPairId] = useState<string | null>(null)
  const [secretMessage, setSecretMessage] = useState<string>("Super secret message")
  const [encryptedMessage, setEncryptedMessage] = useState<string | null>(null)
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null)

  const addKeyPair = (id: string, keyPair: KeyPair) => {
    setKeyPairs(new Map(keyPairs.set(id, keyPair)))
  }

  const removeKeyPair = (id: string) => {
    const newKeyPairs = new Map(keyPairs)
    newKeyPairs.delete(id)
    setKeyPairs(newKeyPairs)
    if (currentKeyPairId === id) {
      setCurrentKeyPairId(null)
    }
  }

  // Function to generate an RSA key pair using node-forge
  const genKeyPair = () => {
    const { privateKey: privKey, publicKey: pubKey } = forge.pki.rsa.generateKeyPair(2048)

    const privatePem = forge.pki.privateKeyToPem(privKey)
    const publicPem = forge.pki.publicKeyToPem(pubKey)

    const id = Date.now().toString()
    addKeyPair(id, { privateKey: privatePem, publicKey: publicPem })
    setCurrentKeyPairId(id)

    console.log("Generated Public Key:", publicPem)
    console.log("Generated Private Key:", privatePem)
  }

  // Function to encrypt the secret message using the public key
  const encryptWithPublicKey = (message: string) => {
    if (!currentKeyPairId) {
      console.error("No key pair selected")
      return
    }
    const currentKeyPair = keyPairs.get(currentKeyPairId)
    if (!currentKeyPair) {
      console.error("Current key pair not found")
      return
    }
    const pubKey = forge.pki.publicKeyFromPem(currentKeyPair.publicKey)
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
    if (!currentKeyPairId) {
      console.error("No key pair selected")
      return
    }
    const currentKeyPair = keyPairs.get(currentKeyPairId)
    if (!currentKeyPair) {
      console.error("Current key pair not found")
      return
    }
    const privKey = forge.pki.privateKeyFromPem(currentKeyPair.privateKey)
    const decrypted = privKey.decrypt(forge.util.decode64(encryptedMessage))

    setDecryptedMessage(forge.util.decodeUtf8(decrypted))
    console.log("Decrypted Message:", forge.util.decodeUtf8(decrypted))
  }

  const value = {
    keyPairs,
    addKeyPair,
    removeKeyPair,
    currentKeyPairId,
    setCurrentKeyPairId,
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