"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, ArrowRight, Play, Download, ExternalLink, Award, Users, Mic, FileText } from "lucide-react"
import type { NewsArticle } from "@/lib/types"

const mockNewsData: NewsArticle[] = [
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

const categories = [
  { name: "All", icon: FileText },
  { name: "Press Releases", icon: FileText },
  { name: "Media Coverage", icon: Mic },
  { name: "Events & Conferences", icon: Users },
  { name: "Awards & Recognitions", icon: Award },
]

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  const filteredArticles = useMemo(() => {
    return mockNewsData.filter((article) => {
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const featuredArticles = filteredArticles.filter((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  const totalPages = Math.ceil(regularArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const paginatedArticles = regularArticles.slice(startIndex, startIndex + articlesPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category ? category.icon : FileText
  }

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-[#c6a35d] mb-4">News & Media</h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Stay updated with the latest developments, achievements, and insights from House of Amaraa. Discover our
          journey of innovation and excellence.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search news, events, or press releases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c6a35d] focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name)
                  setCurrentPage(1)
                }}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-[#c6a35d] text-white shadow-lg transform scale-105"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article) => {
              const IconComponent = getCategoryIcon(article.category)
              return (
                <Card
                  key={article.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.imageSrc || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#c6a35d] text-white">
                        <IconComponent className="w-4 h-4 mr-1" />
                        {article.category}
                      </Badge>
                    </div>
                    {article.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-[#c6a35d] fill-current ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.date)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#c6a35d] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">By {article.author}</span>
                      <Button
                        variant="ghost"
                        className="text-[#c6a35d] font-semibold hover:gap-3 transition-all duration-300"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {selectedCategory === "All" ? "All News" : selectedCategory}
        </h2>
        {paginatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => {
              const IconComponent = getCategoryIcon(article.category)
              return (
                <Card
                  key={article.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.imageSrc || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#c6a35d] text-white">
                        <IconComponent className="w-4 h-4 mr-1" />
                        {article.category}
                      </Badge>
                    </div>
                    {article.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-[#c6a35d] fill-current ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.date)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#c6a35d] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">By {article.author}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#c6a35d] font-semibold hover:gap-3 transition-all duration-300"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-500">Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              variant={currentPage === page ? "default" : "outline"}
              className={currentPage === page ? "bg-[#c6a35d] text-white" : ""}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}

      {/* Media Kit Section */}
      <div className="bg-white dark:bg-gray-800 py-16 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Media Kit</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Access our brand assets, logos, and media contacts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Brand Guidelines", icon: FileText, size: "2.3 MB" },
              { name: "Logo Package", icon: Download, size: "1.8 MB" },
              { name: "Press Images", icon: Download, size: "12.5 MB" },
              { name: "Media Contacts", icon: ExternalLink, size: "PDF" },
            ].map((item, index) => (
              <Card
                key={index}
                className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:bg-[#c6a35d] hover:text-white dark:hover:text-black transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-0">
                  <item.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-sm opacity-70">{item.size}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
