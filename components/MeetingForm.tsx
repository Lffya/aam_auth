"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, Loader2 } from "lucide-react"
import type { Meeting } from "@/lib/types"
import { useUploadThing } from "@/lib/uploadthing"
import { Upload } from "lucide-react"

interface MeetingFormProps {
  meeting?: Meeting | null
  onClose: () => void
  onSave: (meeting: Omit<Meeting, "id">) => void
}

export function MeetingForm({ meeting, onClose, onSave }: MeetingFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setFormData((prev) => ({
          ...prev,
          documentUrl: res[0].url,
          documentName: res[0].name,
        }))
      }
      setIsUploading(false)
    },
    onUploadError: (error: Error) => {
      console.error("Upload error:", error)
      setIsUploading(false)
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      alert("Please select a PDF file")
    }
  }

  const handleFileUpload = async () => {
    if (!file) return
    setIsUploading(true)
    await startUpload([file])
  }

  const [formData, setFormData] = useState({
    title: "",
    agenda: "",
    location: "",
    status: "upcoming" as "upcoming" | "completed" | "cancelled",
    type: "upcoming" as "upcoming" | "past",
    date: "",
    time: "",
    documentUrl: "",
    documentName: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (meeting) {
      setFormData({
        title: meeting.title || "",
        agenda: meeting.agenda || "",
        location: meeting.location || "",
        status: meeting.status || "upcoming",
        type: meeting.type || "upcoming",
        date: meeting.date || "",
        time: meeting.time || "",
        documentUrl: meeting.documentUrl || "",
        documentName: meeting.documentName || "",
      })
    }
  }, [meeting])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSave(formData)
    setSuccess(meeting ? "Meeting updated successfully!" : "Meeting created successfully!")

    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const statuses = [
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ]

  const types = [
    { value: "upcoming", label: "Upcoming" },
    { value: "past", label: "Past" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{meeting ? "Edit Meeting" : "Add New Meeting"}</CardTitle>
              <CardDescription>
                {meeting ? "Update the meeting details" : "Create a new meeting for investors"}
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
              <Label htmlFor="agenda">Agenda *</Label>
              <Textarea
                id="agenda"
                value={formData.agenda}
                onChange={(e) => handleInputChange("agenda", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  placeholder="e.g., December 15, 2024"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  placeholder="e.g., 10:00 AM IST"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">Upload Meeting Document (PDF)</Label>
              <div className="space-y-3">
                <Input id="document" type="file" accept=".pdf" onChange={handleFileChange} />
                {file && (
                  <Button type="button" onClick={handleFileUpload} disabled={isUploading} className="w-full">
                    {isUploading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    {isUploading ? "Uploading..." : "Upload PDF"}
                  </Button>
                )}
                {formData.documentName && (
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                    ✓ Uploaded: {formData.documentName}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="type">Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {meeting ? "Update Meeting" : "Create Meeting"}
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
