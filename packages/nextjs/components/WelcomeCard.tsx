"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, CircleUserRound } from "lucide-react"
import Link from "next/link"

interface WelcomeCardProps {
  title: "applicant" | "company"
}

export default function WelcomeCard({ title }: WelcomeCardProps) {
  return (
    <Card className="mx-auto h-72 w-72 bg-primary shadow-md transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-105">
      <CardContent className="flex h-full w-full flex-col items-center justify-center p-0 transition-colors hover:transition-transform">
        {title === "applicant" ? (
          <Link href="/vacancies" className="flex h-full w-full flex-col items-center justify-center">
            <CircleUserRound strokeWidth={0.75} className="mb-4 h-36 w-36 text-white" />
            <span className="text-center text-2xl font-semibold text-white">APPLICANT</span>
          </Link>
        ) : (
          <Link href={"/dashboard"} className="flex h-full w-full flex-col items-center justify-center">
            <Building2 strokeWidth={0.75} className="mb-4 h-36 w-36 text-white" />
            <span className="text-center text-2xl font-semibold text-white">COMPANY</span>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
