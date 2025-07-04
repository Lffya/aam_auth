"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Edit, Trash2, FileText, Mic, Users, Award, Play } from "lucide-react"
import { NewsForm } from "@/components/NewsForm"
import type { NewsArticle } from "@/lib/types"

const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Amaraa Group Wins Sustainability Excellence Award 2024",
    description:
      "Our commitment to environmental responsibility has been recognized with the prestigious Sustainability Excellence Award, highlighting our renewable energy initiatives and green building practices.",
    content: "Full article content would go here...",
    category: "Awards & Recognitions",
    date: "2024-12-15",
    author: "Amaraa Communications",
    imageSrc: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://www.youtube.com/",
    featured: true,
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Revolutionary Solar Project Launches in Dubai",
    description:
      "Amaraa Group announces the launch of its largest solar installation project, capable of powering 50,000 homes with clean energy.",
    content: "Full article content would go here...",
    category: "Press Releases",
    date: "2024-12-10",
    author: "Energy Division",
    imageSrc: "/placeholder.svg?height=400&width=600",
    videoUrl: "",
    featured: true,
    tags: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Global Tech Summit 2024 Keynote Presentation",
    description:
      "CEO delivers groundbreaking keynote on the future of smart cities and sustainable urban development at the Global Tech Summit.",
    content: "Full article content would go here...",
    category: "Events & Conferences",
    date: "2024-12-05",
    author: "Events Team",
    imageSrc: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://www.youtube.com/",
    featured: false,
    tags: [],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "4",
    title: "Forbes Features Amaraa Group in Top 100 Innovative Companies",
    description:
      "Leading business magazine recognizes our technological innovations and market leadership in sustainable development.",
    content: "Full article content would go here...",
    category: "Media Coverage",
    date: "2024-11-28",
    author: "Forbes Magazine",
    imageSrc: "/placeholder.svg?height=400&width=600",
    videoUrl: "",
    featured: false,
    tags: [],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
]

export function NewsTab() {
  const [news, setNews] = useState<NewsArticle[]>(mockNews)
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      setNews(news.filter((article) => article.id !== id))
    }
  }

  const handleEdit = (article: NewsArticle) => {
    setEditingNews(article)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingNews(null)
  }

  const handleSaveNews = (newsData: Omit<NewsArticle, "id">) => {
    if (editingNews) {
      // Update existing news
      setNews(
        news.map((article) =>
          article.id === editingNews.id ? { ...article, ...newsData, updatedAt: new Date().toISOString() } : article,
        ),
      )
    } else {
      // Create new news
      const newArticle: NewsArticle = {
        ...newsData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setNews([newArticle, ...news])
    }
    handleFormClose()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Press Releases":
        return <FileText className="h-4 w-4" />
      case "Media Coverage":
        return <Mic className="h-4 w-4" />
      case "Events & Conferences":
        return <Users className="h-4 w-4" />
      case "Awards & Recognitions":
        return <Award className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Press Releases":
        return "bg-blue-100 text-blue-800"
      case "Media Coverage":
        return "bg-purple-100 text-purple-800"
      case "Events & Conferences":
        return "bg-green-100 text-green-800"
      case "Awards & Recognitions":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">News & Media Management</h2>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add News Article
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {news.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(article.category)}>
                      {getCategoryIcon(article.category)}
                      <span className="ml-1">{article.category}</span>
                    </Badge>
                    {article.featured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                    {article.videoUrl && (
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        <Play className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <span>By {article.author}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(article)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(article.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {article.imageSrc && (
                  <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={article.imageSrc || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <CardDescription className="mb-3">{article.description}</CardDescription>
                  {/* Tags removed */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-16">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No news articles</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new news article.</p>
          <div className="mt-6">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add News Article
            </Button>
          </div>
        </div>
      )}

      {showForm && <NewsForm news={editingNews} onClose={handleFormClose} onSave={handleSaveNews} />}
    </div>
  )
}
