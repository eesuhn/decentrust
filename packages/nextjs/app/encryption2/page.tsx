"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEncryption } from "@/context/encryption-context"
import type { NextPage } from "next"
import { useAccount } from "wagmi"

const EncryptionPage: NextPage = () => {
  const { address: connectedAddress } = useAccount()
  const {
    publicKey,
    privateKey,
    secretMessage,
    setSecretMessage,
    encryptedMessage,
    decryptedMessage,
    genKeyPair,
    encryptWithPublicKey,
    decryptWithPrivateKey,
  } = useEncryption()

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Data Encryption with RSA</CardTitle>
          <CardDescription>Encrypt and decrypt messages using RSA key pairs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Button onClick={genKeyPair}>Generate Key Pair</Button>
            {connectedAddress && <p className="text-sm text-muted-foreground">Connected: {connectedAddress}</p>}
          </div>

          {publicKey && (
            <div className="space-y-2">
              <Label htmlFor="publicKey">Public Key</Label>
              <Textarea id="publicKey" value={publicKey} readOnly className="font-mono text-xs" />
            </div>
          )}

          {privateKey && (
            <div className="space-y-2">
              <Label htmlFor="privateKey">Private Key</Label>
              <Textarea id="privateKey" value={privateKey} readOnly className="font-mono text-xs" />
            </div>
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
            <Button onClick={() => encryptWithPublicKey(secretMessage)} disabled={!publicKey}>
              Encrypt Message
            </Button>
            <Button onClick={decryptWithPrivateKey} disabled={!encryptedMessage || !privateKey}>
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
