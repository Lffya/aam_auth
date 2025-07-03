"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Building2, MapPin, Clock, Edit, Trash2, Briefcase } from "lucide-react"
import { JobForm } from "@/components/JobForm"

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
  createdAt: string
  updatedAt: string
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    department: "IT Services",
    location: "Mumbai, India",
    type: "Full-time",
    level: "Senior",
    urgent: true,
    salary: "₹25-35L",
    description:
      "We are looking for an experienced software engineer to join our team and help build innovative solutions.",
    requirements: [
      "5+ years of experience in software development",
      "Strong knowledge of JavaScript, TypeScript, and React",
      "Experience with Node.js and backend development",
      "Good understanding of database design and optimization",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Sustainability Analyst",
    department: "Environmental Solutions",
    location: "Remote",
    type: "Full-time",
    level: "Mid-level",
    urgent: false,
    salary: "₹18-25L",
    description:
      "Join our sustainability team to help develop and implement environmental strategies across our operations.",
    requirements: [
      "3+ years of experience in sustainability or environmental science",
      "Knowledge of ESG reporting frameworks",
      "Experience with sustainability data analysis",
      "Strong communication and presentation skills",
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Aviation Safety Inspector",
    department: "Aviation",
    location: "Dubai, UAE",
    type: "Full-time",
    level: "Senior",
    urgent: true,
    salary: "AED 180-220K",
    description: "Ensure compliance with aviation safety standards and regulations across our fleet operations.",
    requirements: [
      "7+ years of experience in aviation safety",
      "Relevant certifications in aviation safety",
      "Experience with safety management systems",
      "Strong attention to detail and analytical skills",
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
]

export function CareersTab() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      setJobs(jobs.filter((job) => job.id !== id))
    }
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingJob(null)
  }

  const handleSaveJob = (jobData: Omit<Job, "id" | "createdAt" | "updatedAt">) => {
    if (editingJob) {
      // Update existing job
      setJobs(
        jobs.map((job) =>
          job.id === editingJob.id ? { ...job, ...jobData, updatedAt: new Date().toISOString() } : job,
        ),
      )
    } else {
      // Create new job
      const newJob: Job = {
        ...jobData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setJobs([newJob, ...jobs])
    }
    handleFormClose()
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Careers Management</h2>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Job Posting
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Building2 className="h-4 w-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.level}</span>
                    </div>
                    {job.urgent && <Badge className="bg-red-100 text-red-800">Urgent</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(job)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(job.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{job.description}</CardDescription>
              <div className="text-sm font-medium text-gray-700 mb-2">Requirements:</div>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              <div className="mt-4 text-lg font-semibold text-amber-600">{job.salary}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-16">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No job postings</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new job posting.</p>
          <div className="mt-6">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Job Posting
            </Button>
          </div>
        </div>
      )}

      {showForm && <JobForm job={editingJob} onClose={handleFormClose} onSave={handleSaveJob} />}
    </div>
  )
}
