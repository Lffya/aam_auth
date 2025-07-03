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
import { X, Loader2, Plus, Trash } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  level: string
  urgent: boolean
  salary: string
  description: string
  requirements: string[]
  createdAt?: string
  updatedAt?: string
}

interface JobFormProps {
  job?: Job | null
  onClose: () => void
  onSave: (job: Omit<Job, "id" | "createdAt" | "updatedAt">) => void
}

export function JobForm({ job, onClose, onSave }: JobFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    level: "Mid-level",
    urgent: false,
    salary: "",
    description: "",
    requirements: [""],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        department: job.department || "",
        location: job.location || "",
        type: job.type || "Full-time",
        level: job.level || "Mid-level",
        urgent: job.urgent || false,
        salary: job.salary || "",
        description: job.description || "",
        requirements: job.requirements.length > 0 ? job.requirements : [""],
      })
    }
  }, [job])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    // Filter out empty requirements
    const filteredRequirements = formData.requirements.filter((req) => req.trim() !== "")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSave({
      ...formData,
      requirements: filteredRequirements.length > 0 ? filteredRequirements : ["No specific requirements"],
    })
    setSuccess(job ? "Job updated successfully!" : "Job created successfully!")

    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formData.requirements]
    updatedRequirements[index] = value
    setFormData((prev) => ({ ...prev, requirements: updatedRequirements }))
  }

  const addRequirement = () => {
    setFormData((prev) => ({ ...prev, requirements: [...prev.requirements, ""] }))
  }

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const updatedRequirements = [...formData.requirements]
      updatedRequirements.splice(index, 1)
      setFormData((prev) => ({ ...prev, requirements: updatedRequirements }))
    }
  }

  const departments = [
    "IT Services",
    "Environmental Solutions",
    "Aviation",
    "Agro Group",
    "Financial Services",
    "Security Shield",
    "Logistics",
    "Real Estate",
    "Energy Solutions",
    "Media & Communications",
    "Manufacturing",
    "Hospitality",
    "Consulting",
  ]

  const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship", "Remote"]

  const jobLevels = ["Entry", "Mid-level", "Senior", "Executive"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{job ? "Edit Job Posting" : "Add New Job Posting"}</CardTitle>
              <CardDescription>
                {job ? "Update the job details" : "Create a new job posting for potential candidates"}
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
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g., Mumbai, India or Remote"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Job Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Experience Level *</Label>
                <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range *</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="e.g., ₹25-35L or $80-100K"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Switch
                  id="urgent"
                  checked={formData.urgent}
                  onCheckedChange={(checked) => handleInputChange("urgent", checked)}
                />
                <Label htmlFor="urgent">Mark as Urgent</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Requirements</Label>
                <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                  <Plus className="h-4 w-4 mr-1" /> Add Requirement
                </Button>
              </div>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRequirement(index)}
                    disabled={formData.requirements.length <= 1}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {job ? "Update Job Posting" : "Create Job Posting"}
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
