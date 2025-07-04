export interface Notice {
  id: string
  title: string
  description: string
  category: string
  priority: "low" | "medium" | "high"
  date: string
  regulatory?: string
  fileUrl?: string
  fileName?: string
  createdAt?: string
  updatedAt?: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Category {
  name: string
  count: number
}

export interface Meeting {
  id: string
  title: string
  agenda: string
  location: string
  status: "upcoming" | "completed" | "cancelled"
  type: "upcoming" | "past"
  date: string
  time: string
  documentUrl?: string
  documentName?: string
  createdAt?: string
  updatedAt?: string
}

export interface Resolution {
  id: string
  title: string
  status: "approved" | "rejected" | "pending"
  votes: string
  meetingId?: string
  createdAt?: string
  updatedAt?: string
}

export interface CVSubmission {
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

export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  category: "Press Releases" | "Media Coverage" | "Events & Conferences" | "Awards & Recognitions"
  date: string
  author: string
  imageSrc: string
  videoUrl?: string
  featured: boolean
  tags: string[]
  createdAt?: string
  updatedAt?: string
}
