import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, ChevronRight, FileText, Medal, Star, Trophy } from "lucide-react"

const documents = [
  { type: "resume", name: "Software Engineer Resume", date: "2023-05-15" },
  {
    type: "certificate",
    name: "React Developer Certificate",
    date: "2023-03-10",
  },
  { type: "resume", name: "Project Manager Resume", date: "2023-04-22" },
  { type: "certificate", name: "Agile Scrum Master", date: "2023-02-28" },
]

const badges = [
  { name: "Early Adopter", icon: Star },
  { name: "Blockchain Expert", icon: Award },
  { name: "Diamond Contributor", icon: Trophy },
  { name: "1000 Commits", icon: Medal },
]

export default function DashboardWidget({ type }: { type: "documents" | "badges" }) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{type === "documents" ? "Documents" : "Badges"}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {type === "documents" &&
            documents.map((doc, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-secondary"
                  onClick={() => console.log(`Clicked: ${doc.name}`)}
                >
                  <div className="flex w-full items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.date}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              </li>
            ))}

          {type === "badges" &&
            badges.map((badge, index) => (
              <li key={index} className="flex items-center space-x-3 rounded-md p-2 hover:bg-secondary">
                <div className="flex-shrink-0">
                  <badge.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium">{badge.name}</p>
                </div>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  )
}
