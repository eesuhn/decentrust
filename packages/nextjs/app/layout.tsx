import { ScaffoldEthAppWithProviders } from "@/components/ScaffoldEthAppWithProviders"
import { ThemeProvider } from "@/components/ThemeProvider"
import { EncryptionProvider } from "@/context/encryption-context"
import "@/styles/globals.css"
import { getMetadata } from "@/utils/scaffold-eth/getMetadata"
import "@rainbow-me/rainbowkit/styles.css"

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
})

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className="bg-base-100 dark:bg-black dark:text-white">
        <ThemeProvider enableSystem>
          <EncryptionProvider>
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </EncryptionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default ScaffoldEthApp
