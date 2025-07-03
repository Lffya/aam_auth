"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, Loader2 } from "lucide-react"
import type { Resolution, Meeting } from "@/lib/types"

interface ResolutionFormProps {
  resolution?: Resolution | null
  meetings: Meeting[]
  onClose: () => void
  onSave: (resolution: Omit<Resolution, "id">) => void
}

export function ResolutionForm({ resolution, meetings, onClose, onSave }: ResolutionFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    status: "pending" as "approved" | "rejected" | "pending",
    votes: "",
    meetingId: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (resolution) {
      setFormData({
        title: resolution.title || "",
        status: resolution.status || "pending",
        votes: resolution.votes || "",
        meetingId: resolution.meetingId || "",
      })
    }
  }, [resolution])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSave(formData)
    setSuccess(resolution ? "Resolution updated successfully!" : "Resolution created successfully!")

    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const statuses = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{resolution ? "Edit Resolution" : "Add New Resolution"}</CardTitle>
              <CardDescription>
                {resolution ? "Update the resolution details" : "Create a new resolution"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="votes">Votes Percentage *</Label>
              <Input
                id="votes"
                value={formData.votes}
                onChange={(e) => handleInputChange("votes", e.target.value)}
                placeholder="e.g., 98.5%"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingId">Associated Meeting (Optional)</Label>
              <Select value={formData.meetingId} onValueChange={(value) => handleInputChange("meetingId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No meeting</SelectItem>
                  {meetings.map((meeting) => (
                    <SelectItem key={meeting.id} value={meeting.id}>
                      {meeting.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {resolution ? "Update Resolution" : "Create Resolution"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
