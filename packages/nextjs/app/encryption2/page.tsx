"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { NextPage } from "next"
import { useAccount } from "wagmi"
import { useEncryption } from "@/context/encryption-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const EncryptionPage: NextPage = () => {
  const { address: connectedAddress } = useAccount()
  const {
    keyPairs,
    currentKeyPairId,
    setCurrentKeyPairId,
    secretMessage,
    setSecretMessage,
    encryptedMessage,
    decryptedMessage,
    genKeyPair,
    encryptWithPublicKey,
    decryptWithPrivateKey,
  } = useEncryption()

  const [currentKeyPair, setCurrentKeyPair] = useState<{ publicKey: string; privateKey: string } | null>(null)

  useEffect(() => {
    if (currentKeyPairId) {
      const keyPair = keyPairs.get(currentKeyPairId)
      if (keyPair) {
        setCurrentKeyPair(keyPair)
      }
    } else {
      setCurrentKeyPair(null)
    }
  }, [currentKeyPairId, keyPairs])

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Data Encryption with RSA</CardTitle>
          <CardDescription>Encrypt and decrypt messages using RSA key pairs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Button onClick={genKeyPair}>Generate New Key Pair</Button>
            {connectedAddress && <p className="text-sm text-muted-foreground">Connected: {connectedAddress}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyPairSelect">Select Key Pair</Label>
            <Select value={currentKeyPairId || ""} onValueChange={setCurrentKeyPairId}>
              <SelectTrigger id="keyPairSelect">
                <SelectValue placeholder="Select a key pair" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(keyPairs.entries()).map(([id, keyPair]) => (
                  <SelectItem key={id} value={id}>
                    Key Pair {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentKeyPair && (
            <>
              <div className="space-y-2">
                <Label htmlFor="publicKey">Public Key</Label>
                <Textarea id="publicKey" value={currentKeyPair.publicKey} readOnly className="font-mono text-xs" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="privateKey">Private Key</Label>
                <Textarea id="privateKey" value={currentKeyPair.privateKey} readOnly className="font-mono text-xs" />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="secretMessage">Secret Message</Label>
            <Input
              id="secretMessage"
              value={secretMessage}
              onChange={(e) => setSecretMessage(e.target.value)}
              placeholder="Enter your secret message"
            />
          </div>

          <div className="flex justify-between">
            <Button onClick={() => encryptWithPublicKey(secretMessage)} disabled={!currentKeyPair}>
              Encrypt Message
            </Button>
            <Button onClick={decryptWithPrivateKey} disabled={!encryptedMessage || !currentKeyPair}>
              Decrypt Message
            </Button>
          </div>

          {encryptedMessage && (
            <div className="space-y-2">
              <Label htmlFor="encryptedMessage">Encrypted Message</Label>
              <Textarea id="encryptedMessage" value={encryptedMessage} readOnly className="font-mono text-xs" />
            </div>
          )}

          {decryptedMessage && (
            <div className="space-y-2">
              <Label htmlFor="decryptedMessage">Decrypted Message</Label>
              <Textarea id="decryptedMessage" value={decryptedMessage} readOnly className="font-mono text-xs" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Note: Keep your private key secret. Never share it with anyone.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EncryptionPage
