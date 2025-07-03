"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, Download, Eye, Edit, Trash2 } from "lucide-react"
import { NoticeForm } from "@/components/NoticeForm"
import type { Notice } from "@/lib/types"

const mockNotices: Notice[] = [
  {
    id: "1",
    title: "Q3 Financial Results Released",
    description:
      "Our third quarter financial results have been published and are available for review. The company has shown strong growth across all sectors.",
    category: "Financial",
    priority: "high",
    date: new Date().toISOString(),
    regulatory: "SEC",
    fileUrl: "",
    fileName: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "New Compliance Guidelines",
    description:
      "Updated compliance guidelines have been issued following recent regulatory changes. All stakeholders are advised to review the new requirements.",
    category: "Regulatory",
    priority: "medium",
    date: new Date(Date.now() - 86400000).toISOString(),
    regulatory: "SEBI",
    fileUrl: "",
    fileName: "",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Board Meeting Minutes",
    description:
      "Minutes from the latest board meeting are now available. Key decisions regarding future strategy and investments have been documented.",
    category: "Corporate",
    priority: "low",
    date: new Date(Date.now() - 172800000).toISOString(),
    regulatory: "",
    fileUrl: "",
    fileName: "",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
]

export function NoticesTab() {
  const [notices, setNotices] = useState<Notice[]>(mockNotices)
  const [showForm, setShowForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter((notice) => notice.id !== id))
    }
  }

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingNotice(null)
  }

  const handleSaveNotice = (noticeData: Omit<Notice, "id">) => {
    if (editingNotice) {
      // Update existing notice
      setNotices(
        notices.map((notice) =>
          notice.id === editingNotice.id ? { ...notice, ...noticeData, updatedAt: new Date().toISOString() } : notice,
        ),
      )
    } else {
      // Create new notice
      const newNotice: Notice = {
        ...noticeData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setNotices([newNotice, ...notices])
    }
    handleFormClose()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Notices Management</h2>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Notice
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {notices.map((notice) => (
          <Card key={notice.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">{notice.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(notice.date).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="secondary">{notice.category}</Badge>
                    <Badge className={getPriorityColor(notice.priority)}>{notice.priority}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(notice)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(notice.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{notice.description}</CardDescription>
              {notice.fileUrl && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {notices.length === 0 && (
        <div className="text-center py-16">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No notices</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new notice.</p>
          <div className="mt-6">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Notice
            </Button>
          </div>
        </div>
      )}

      {showForm && <NoticeForm notice={editingNotice} onClose={handleFormClose} onSave={handleSaveNotice} />}
    </div>
  )
}
