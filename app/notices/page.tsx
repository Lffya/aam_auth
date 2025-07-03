"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, FileText, Calendar, Download, Search, Filter, Globe, Scale, Building, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
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

const categoriesStatic = [
  { name: "Legal", count: 0, icon: <Scale className="h-4 w-4" /> },
  { name: "Corporate", count: 1, icon: <Building className="h-4 w-4" /> },
  { name: "Financial", count: 1, icon: <FileText className="h-4 w-4" /> },
  { name: "Regulatory", count: 1, icon: <Globe className="h-4 w-4" /> },
  { name: "General", count: 0, icon: <Building className="h-4 w-4" /> },
]

export default function NoticesPage() {
  const [notices] = useState<Notice[]>(mockNotices)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filterNotices = (notices: Notice[]) => {
    return notices.filter((notice) => {
      const matchesCategory = !activeCategory || notice.category === activeCategory
      const matchesSearch =
        searchQuery === "" ||
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }

  const filteredNotices = filterNotices(notices)
  const urgentNotices = filteredNotices.filter((notice) => notice.priority === "high")
  const recentNotices = filteredNotices.filter((notice) => notice.priority !== "high")

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setActiveCategory(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#c6a35d] mb-4">Investor Notices</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Stay informed with the latest regulatory updates, compliance notices, and important announcements.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notices..."
                className="pl-10 border-amber-200 focus:border-amber-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {categoriesStatic.map((category, index) => (
            <Card
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className={`border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all cursor-pointer ${
                activeCategory === category.name ? "ring-2 ring-amber-600" : "hover:ring-1 hover:ring-amber-400"
              }`}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2 text-amber-600">{category.icon}</div>
                <h3 className="font-medium text-foreground">{category.name}</h3>
                <p className="text-2xl font-bold text-amber-600">{category.count}</p>
                <p className="text-xs text-muted-foreground">Active Notices</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotices.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No notices found matching your criteria.</p>
          </div>
        ) : (
          <>
            {urgentNotices.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <h2 className="text-2xl font-semibold text-foreground">Urgent Notices</h2>
                </div>
                <div className="grid gap-6">
                  {urgentNotices.map((notice) => (
                    <Card key={notice.id} className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl text-foreground mb-2">{notice.title}</CardTitle>
                            <div className="flex flex-wrap items-center gap-4">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(notice.date).toLocaleDateString()}</span>
                              </div>
                              <Badge variant="secondary">{notice.category}</Badge>
                              <Badge className={getPriorityColor(notice.priority)}>{notice.priority}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground mb-4">{notice.description}</CardDescription>
                        {notice.regulatory && (
                          <p className="text-xs text-muted-foreground mb-4">
                            <strong>Regulatory Authority:</strong> {notice.regulatory}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-black"
                            disabled
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
                            disabled
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {recentNotices.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground">Recent Notices</h2>
                </div>
                <div className="grid gap-6">
                  {recentNotices.map((notice) => (
                    <Card
                      key={notice.id}
                      className="border-amber-200 dark:border-amber-800 hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg text-foreground mb-2">{notice.title}</CardTitle>
                            <div className="flex flex-wrap items-center gap-4">
                              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(notice.date).toLocaleDateString()}</span>
                              </div>
                              <Badge variant="secondary">{notice.category}</Badge>
                              <Badge className={getPriorityColor(notice.priority)}>{notice.priority}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground mb-3">{notice.description}</CardDescription>
                        {notice.regulatory && (
                          <p className="text-xs text-muted-foreground mb-4">
                            <strong>Regulatory Authority:</strong> {notice.regulatory}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
                            disabled
                          >
                            <Download className="mr-2 h-3 w-3" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600/10 bg-transparent"
                            disabled
                          >
                            <Eye className="mr-2 h-3 w-3" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
