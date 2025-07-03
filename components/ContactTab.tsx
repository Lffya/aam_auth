"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar, User, Trash2, Eye, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  submittedAt: string
}

const mockSubmissions: ContactSubmission[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 555-123-4567",
    message:
      "I'm interested in learning more about your investment opportunities in the renewable energy sector. Could someone from your team contact me to discuss potential partnerships?",
    status: "new",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 98765 43210",
    message:
      "I represent a technology startup focused on sustainable agriculture solutions. We're looking for potential investors and would like to schedule a meeting to present our business model.",
    status: "read",
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    name: "Michael Wong",
    email: "michael.wong@example.com",
    phone: "+65 8123 4567",
    message:
      "I'm a journalist writing an article about innovative conglomerates in the APAC region. I would appreciate the opportunity to interview a representative from your company for this feature.",
    status: "replied",
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
  },
]

export function ContactTab() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(mockSubmissions)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this contact submission?")) {
      setSubmissions(submissions.filter((submission) => submission.id !== id))
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null)
      }
    }
  }

  const handleStatusChange = (id: string, status: "new" | "read" | "replied" | "archived") => {
    setSubmissions(submissions.map((submission) => (submission.id === id ? { ...submission, status } : submission)))
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status })
    }
  }

  const handleViewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission)
    // Mark as read if it's new
    if (submission.status === "new") {
      handleStatusChange(submission.id, "read")
    }
  }

  const closeSubmissionView = () => {
    setSelectedSubmission(null)
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus
    const matchesSearch =
      searchQuery === "" ||
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>
      case "read":
        return (
          <Badge variant="outline" className="text-gray-600">
            Read
          </Badge>
        )
      case "replied":
        return <Badge className="bg-green-100 text-green-800">Replied</Badge>
      case "archived":
        return <Badge variant="secondary">Archived</Badge>
      default:
        return null
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Submissions</h2>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Submissions</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubmissions.map((submission) => (
          <Card
            key={submission.id}
            className={`hover:shadow-lg transition-shadow ${submission.status === "new" ? "border-blue-300 bg-blue-50" : ""}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-1">{submission.name}</CardTitle>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Mail className="h-3 w-3" />
                    <span>{submission.email}</span>
                  </div>
                </div>
                {getStatusBadge(submission.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <Phone className="h-3 w-3" />
                <span>{submission.phone}</span>
              </div>
              <CardDescription className="line-clamp-3 mb-4">{submission.message}</CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleViewSubmission(submission)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(submission.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-16">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No contact submissions</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || filterStatus !== "all"
              ? "No submissions match your current filters."
              : "When visitors submit the contact form, their messages will appear here."}
          </p>
        </div>
      )}

      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle>{selectedSubmission.name}</CardTitle>
                    <CardDescription>{selectedSubmission.email}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeSubmissionView}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Phone:</div>
                <div>{selectedSubmission.phone}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Message:</div>
                <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">{selectedSubmission.message}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Submitted:</div>
                <div>{new Date(selectedSubmission.submittedAt).toLocaleString()}</div>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(selectedSubmission.status)}
                </div>
                <div className="flex gap-2">
                  <Select
                    value={selectedSubmission.status}
                    onValueChange={(value) =>
                      handleStatusChange(
                        selectedSubmission.id,
                        value as "new" | "read" | "replied" | "archived"
                      )
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Mark as New</SelectItem>
                      <SelectItem value="read">Mark as Read</SelectItem>
                      <SelectItem value="replied">Mark as Replied</SelectItem>
                      <SelectItem value="archived">Archive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => handleDelete(selectedSubmission.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
