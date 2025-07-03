"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, FileText, Video, Download } from "lucide-react"
import type { Meeting, Resolution } from "@/lib/types"

const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Annual General Meeting 2024",
    agenda: "Review of annual financial statements, election of directors, and approval of dividend distribution.",
    location: "Corporate Headquarters, Conference Hall A",
    status: "upcoming",
    type: "upcoming",
    date: "December 15, 2024",
    time: "10:00 AM IST",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Extraordinary General Meeting",
    agenda: "Discussion on merger proposal and strategic business decisions for Q1 2025.",
    location: "Virtual Meeting Platform",
    status: "completed",
    type: "past",
    date: "September 20, 2024",
    time: "2:00 PM IST",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
]

const mockResolutions: Resolution[] = [
  {
    id: "1",
    title: "Approval of Annual Financial Statements",
    status: "approved",
    votes: "98.5%",
    meetingId: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Election of Independent Directors",
    status: "approved",
    votes: "95.2%",
    meetingId: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function MeetingsPage() {
  const [meetings] = useState<Meeting[]>(mockMeetings)
  const [resolutions] = useState<Resolution[]>(mockResolutions)

  const upcomingMeetings = meetings.filter((meeting) => meeting.type === "upcoming")
  const pastMeetings = meetings.filter((meeting) => meeting.type === "past")

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#c6a35d] mb-4">Shareholder Meetings</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Stay informed about upcoming meetings, participate in governance, and access meeting records and resolutions.
        </p>
      </div>

      {upcomingMeetings.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Upcoming Meetings</h2>
          <div className="grid gap-6">
            {upcomingMeetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20"
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground mb-2">{meeting.title}</CardTitle>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{meeting.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-amber-600 text-black self-start sm:self-center">{meeting.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    <strong>Agenda:</strong> {meeting.agenda}
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-black" disabled>
                      <Users className="mr-2 h-4 w-4" />
                      Register Now
                    </Button>
                    <Button
                      variant="outline"
                      className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
                      disabled
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Join Meeting
                    </Button>
                    <Button
                      variant="outline"
                      className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
                      disabled
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Notice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {resolutions.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Resolutions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resolutions.map((resolution) => (
              <Card key={resolution.id} className="border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground">{resolution.title}</h3>
                    <Badge
                      variant="secondary"
                      className={`flex-shrink-0 ml-2 ${
                        resolution.status === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : resolution.status === "rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {resolution.status}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-amber-600">{resolution.votes}</p>
                  <p className="text-sm text-muted-foreground">approval</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {pastMeetings.length > 0 && (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Past Meetings</h2>
            <Button
              variant="outline"
              className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent self-start sm:self-center"
              disabled
            >
              <FileText className="mr-2 h-4 w-4" />
              View Archives
            </Button>
          </div>

          <div className="grid gap-6">
            {pastMeetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="border-amber-200 dark:border-amber-800 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg text-foreground mb-2">{meeting.title}</CardTitle>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{meeting.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="self-start sm:self-center">
                      {meeting.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    <strong>Agenda:</strong> {meeting.agenda}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
                      disabled
                    >
                      <Download className="mr-2 h-3 w-3" />
                      Download Minutes
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
                      disabled
                    >
                      <FileText className="mr-2 h-3 w-3" />
                      View Resolutions
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
                      disabled
                    >
                      <Video className="mr-2 h-3 w-3" />
                      Watch Recording
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
