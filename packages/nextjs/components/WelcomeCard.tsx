import { Card, CardContent } from "@/components/ui/card"
import { Building2, CircleUserRound } from "lucide-react"
import Link from "next/link"

export default function WelcomeCard({ title }: { title: "applicant" | "recruiter" }) {
  return (
    <Link href={title === "applicant" ? "/vacancies" : "/dashboard-company"}>
      <Card className="mx-auto h-72 w-72 bg-primary shadow-md transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-105">
        <CardContent className="flex h-full w-full flex-col items-center justify-center p-0 transition-colors hover:transition-transform">
          <div className="mb-4 flex-shrink-0 rounded-full bg-primary">
            {title === "applicant" ? (
              <CircleUserRound strokeWidth={0.75} className="h-36 w-36 text-white" />
            ) : (
              <Building2 strokeWidth={0.75} className="h-36 w-36 text-white" />
            )}
          </div>
          <span className="text-center text-2xl font-semibold text-white">{title.toUpperCase()}</span>
        </CardContent>
      </Card>
    </Link>
  )
}
