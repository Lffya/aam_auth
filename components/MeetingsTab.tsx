"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, Clock, MapPin, Edit, Trash2, Users } from "lucide-react"
import { MeetingForm } from "@/components/MeetingForm"
import { ResolutionForm } from "@/components/ResolutionForm"
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
    registerButton: "Register Now",
    joinButton: "Join Meeting",
    noticeButton: "Download Notice",
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
    minutesButton: "Download Minutes",
    resolutionsButton: "View Resolutions",
    recordingButton: "Watch Recording",
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

export function MeetingsTab() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings)
  const [resolutions, setResolutions] = useState<Resolution[]>(mockResolutions)
  const [showMeetingForm, setShowMeetingForm] = useState(false)
  const [showResolutionForm, setShowResolutionForm] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null)
  const [editingResolution, setEditingResolution] = useState<Resolution | null>(null)

  const handleDeleteMeeting = (id: string) => {
    if (confirm("Are you sure you want to delete this meeting?")) {
      setMeetings(meetings.filter((meeting) => meeting.id !== id))
    }
  }

  const handleDeleteResolution = (id: string) => {
    if (confirm("Are you sure you want to delete this resolution?")) {
      setResolutions(resolutions.filter((resolution) => resolution.id !== id))
    }
  }

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting)
    setShowMeetingForm(true)
  }

  const handleEditResolution = (resolution: Resolution) => {
    setEditingResolution(resolution)
    setShowResolutionForm(true)
  }

  const handleMeetingFormClose = () => {
    setShowMeetingForm(false)
    setEditingMeeting(null)
  }

  const handleResolutionFormClose = () => {
    setShowResolutionForm(false)
    setEditingResolution(null)
  }

  const handleSaveMeeting = (meetingData: Omit<Meeting, "id">) => {
    if (editingMeeting) {
      setMeetings(
        meetings.map((meeting) =>
          meeting.id === editingMeeting.id
            ? { ...meeting, ...meetingData, updatedAt: new Date().toISOString() }
            : meeting,
        ),
      )
    } else {
      const newMeeting: Meeting = {
        ...meetingData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setMeetings([newMeeting, ...meetings])
    }
    handleMeetingFormClose()
  }

  const handleSaveResolution = (resolutionData: Omit<Resolution, "id">) => {
    if (editingResolution) {
      setResolutions(
        resolutions.map((resolution) =>
          resolution.id === editingResolution.id
            ? { ...resolution, ...resolutionData, updatedAt: new Date().toISOString() }
            : resolution,
        ),
      )
    } else {
      const newResolution: Resolution = {
        ...resolutionData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setResolutions([newResolution, ...resolutions])
    }
    handleResolutionFormClose()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <Tabs defaultValue="meetings" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="resolutions">Resolutions</TabsTrigger>
        </TabsList>

        <TabsContent value="meetings" className="mt-6">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Meetings Management</h3>
              <Button onClick={() => setShowMeetingForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Meeting
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{meeting.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          <span>{meeting.location}</span>
                        </div>
                        <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditMeeting(meeting)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteMeeting(meeting.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    <strong>Agenda:</strong> {meeting.agenda}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {meetings.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No meetings</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new meeting.</p>
              <div className="mt-6">
                <Button onClick={() => setShowMeetingForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Meeting
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolutions" className="mt-6">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Resolutions Management</h3>
              <Button onClick={() => setShowResolutionForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Resolution
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {resolutions.map((resolution) => (
              <Card key={resolution.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{resolution.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-4">
                        <Badge className={getStatusColor(resolution.status)}>{resolution.status}</Badge>
                        <span className="text-2xl font-bold text-amber-600">{resolution.votes}</span>
                        <span className="text-sm text-gray-500">approval</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditResolution(resolution)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteResolution(resolution.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {resolutions.length === 0 && (
            <div className="text-center py-16">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No resolutions</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new resolution.</p>
              <div className="mt-6">
                <Button onClick={() => setShowResolutionForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Resolution
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {showMeetingForm && (
        <MeetingForm meeting={editingMeeting} onClose={handleMeetingFormClose} onSave={handleSaveMeeting} />
      )}
      {showResolutionForm && (
        <ResolutionForm
          resolution={editingResolution}
          meetings={meetings}
          onClose={handleResolutionFormClose}
          onSave={handleSaveResolution}
        />
      )}
    </div>
  )
}
