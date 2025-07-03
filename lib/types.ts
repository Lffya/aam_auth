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
  registerButton?: string
  joinButton?: string
  noticeButton?: string
  minutesButton?: string
  resolutionsButton?: string
  recordingButton?: string
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
