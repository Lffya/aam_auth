"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Trash2, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CVSubmission {
  id: string
  name: string
  email: string
  phone: string
  position: string
  experience: string
  cvUrl: string
  cvFileName: string
  status: "new" | "reviewed" | "shortlisted" | "rejected"
  submittedAt: string
}

const mockCVs: CVSubmission[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 555-123-4567",
    position: "Senior Software Engineer",
    experience: "5+ years",
    cvUrl: "/placeholder-cv.pdf",
    cvFileName: "john_smith_cv.pdf",
    status: "new",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 555-987-6543",
    position: "Marketing Manager",
    experience: "3-5 years",
    cvUrl: "/placeholder-cv.pdf",
    cvFileName: "sarah_johnson_cv.pdf",
    status: "reviewed",
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+65 8123 4567",
    position: "Data Scientist",
    experience: "2-3 years",
    cvUrl: "/placeholder-cv.pdf",
    cvFileName: "michael_chen_cv.pdf",
    status: "shortlisted",
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+44 20 7123 4567",
    position: "UX Designer",
    experience: "1-2 years",
    cvUrl: "/placeholder-cv.pdf",
    cvFileName: "emily_davis_cv.pdf",
    status: "rejected",
    submittedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+91 98765 43210",
    position: "Product Manager",
    experience: "4-6 years",
    cvUrl: "/placeholder-cv.pdf",
    cvFileName: "david_wilson_cv.pdf",
    status: "new",
    submittedAt: new Date(Date.now() - 345600000).toISOString(),
  },
]

export function CVTab() {
  const [cvs, setCvs] = useState<CVSubmission[]>(mockCVs)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPosition, setFilterPosition] = useState<string>("all")

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this CV submission?")) {
      setCvs(cvs.filter((cv) => cv.id !== id))
    }
  }

  const handleStatusChange = (id: string, status: "new" | "reviewed" | "shortlisted" | "rejected") => {
    setCvs(cvs.map((cv) => (cv.id === id ? { ...cv, status } : cv)))
  }

  const handleDownload = (cvUrl: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = cvUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredCVs = cvs.filter((cv) => {
    const matchesSearch =
      searchQuery === "" ||
      cv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.position.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || cv.status === filterStatus
    const matchesPosition = filterPosition === "all" || cv.position === filterPosition
    return matchesSearch && matchesStatus && matchesPosition
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>
      case "reviewed":
        return <Badge className="bg-yellow-100 text-yellow-800">Reviewed</Badge>
      case "shortlisted":
        return <Badge className="bg-green-100 text-green-800">Shortlisted</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return null
    }
  }

  const uniquePositions = Array.from(new Set(cvs.map((cv) => cv.position)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">CV Submissions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: {cvs.length} | New: {cvs.filter((cv) => cv.status === "new").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPosition} onValueChange={setFilterPosition}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Positions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {uniquePositions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery("")
            setFilterStatus("all")
            setFilterPosition("all")
          }}
        >
          <Filter className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="font-semibold text-gray-900">NAME</TableHead>
              <TableHead className="font-semibold text-gray-900">EMAIL</TableHead>
              <TableHead className="font-semibold text-gray-900">POSITION</TableHead>
              <TableHead className="font-semibold text-gray-900">DATE</TableHead>
              <TableHead className="font-semibold text-gray-900">STATUS</TableHead>
              <TableHead className="font-semibold text-gray-900">CV</TableHead>
              <TableHead className="font-semibold text-gray-900">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCVs.map((cv) => (
              <TableRow key={cv.id} className="border-b hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{cv.name}</TableCell>
                <TableCell className="text-gray-600">{cv.email}</TableCell>
                <TableCell className="text-gray-600">{cv.position}</TableCell>
                <TableCell className="text-gray-600">
                  {new Date(cv.submittedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>{getStatusBadge(cv.status)}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(cv.cvUrl, cv.cvFileName)}
                    className="cursor-pointer"
                  >
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Select value={cv.status} onValueChange={(value) => handleStatusChange(cv.id, value as any)}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(cv.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredCVs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No CV submissions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
