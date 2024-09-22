import { ScaffoldEthAppWithProviders } from "@/components/ScaffoldEthAppWithProviders"
import { ThemeProvider } from "@/components/ThemeProvider"
import { EncryptionProvider } from "@/context/encryption-context"
import "@/styles/globals.css"
import { getMetadata } from "@/utils/scaffold-eth/getMetadata"
import "@rainbow-me/rainbowkit/styles.css"
import { Toaster } from "react-hot-toast"

export const metadata = getMetadata({
  title: "DecenTRUST",
  description: "Decentralised Transparent Recruitment Under Secure Technology",
})

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className="bg-base-100 dark:bg-black dark:text-white">
        <ThemeProvider enableSystem>
          <EncryptionProvider>
            <Toaster />
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </EncryptionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default ScaffoldEthApp
