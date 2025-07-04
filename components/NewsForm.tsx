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
import { Switch } from "@/components/ui/switch"
import { X, Loader2, Upload } from "lucide-react"
import type { NewsArticle } from "@/lib/types"
import { useUploadThing } from "@/lib/uploadthing"

interface NewsFormProps {
  news?: NewsArticle | null
  onClose: () => void
  onSave: (news: Omit<NewsArticle, "id">) => void
}

export function NewsForm({ news, onClose, onSave }: NewsFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "Press Releases",
    date: "",
    author: "",
    imageSrc: "",
    videoUrl: "",
    featured: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setFormData((prev) => ({
          ...prev,
          imageSrc: res[0].url,
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
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
    } else {
      alert("Please select an image file")
    }
  }

  const handleFileUpload = async () => {
    if (!file) return
    setIsUploading(true)
    await startUpload([file])
  }

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || "",
        description: news.description || "",
        content: news.content || "",
        category: news.category || "Press Releases",
        date: news.date || "",
        author: news.author || "",
        imageSrc: news.imageSrc || "",
        videoUrl: news.videoUrl || "",
        featured: news.featured || false,
      })
    }
  }, [news])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSave({
      ...formData,
      tags: [],
    })
    setSuccess(news ? "News article updated successfully!" : "News article created successfully!")

    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const categories = ["Press Releases", "Media Coverage", "Events & Conferences", "Awards & Recognitions"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{news ? "Edit News Article" : "Add New News Article"}</CardTitle>
              <CardDescription>
                {news ? "Update the news article details" : "Create a new news article for the media section"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
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
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="e.g., Amaraa Communications"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL (Optional)</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                    placeholder="https://www.youtube.com/..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                  />
                  <Label htmlFor="featured">Mark as Featured Article</Label>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content">Full Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    rows={8}
                    placeholder="Write the full article content here..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image</Label>
                  <div className="space-y-3">
                    <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
                    {file && (
                      <Button type="button" onClick={handleFileUpload} disabled={isUploading} className="w-full">
                        {isUploading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="mr-2 h-4 w-4" />
                        )}
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </Button>
                    )}
                    {formData.imageSrc && (
                      <div className="space-y-2">
                        <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                          ✓ Image uploaded successfully
                        </div>
                        <img
                          src={formData.imageSrc || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
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
                {news ? "Update Article" : "Create Article"}
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
