"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Define some future dates to highlight
  const highlightedDates = [
    new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days from now
    new Date(new Date().setDate(new Date().getDate() + 7)), // 1 week from now
  ]

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Scheduled interviews</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            highlighted: highlightedDates,
          }}
          modifiersStyles={{
            highlighted: { backgroundColor: "#22c55e", color: "white" },
          }}
          components={{
            DayContent: ({ date, isSelected }: any) => (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center",
                  isSelected && "rounded-full bg-primary text-primary-foreground",
                  highlightedDates.some((d) => d.toDateString() === date.toDateString()) && "rounded-full bg-green-500 text-white",
                )}
              >
                {date.getDate()}
              </div>
            ),
          }}
        />
      </CardContent>
    </Card>
  )
}
