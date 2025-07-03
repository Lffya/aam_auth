"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Users, Phone, TrendingUp, Eye, MessageSquare } from "lucide-react"
import Image from "next/image"

const stats = [
  {
    title: "Total Notices",
    value: "12",
    change: "+2 this week",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Upcoming Meetings",
    value: "3",
    change: "Next: Dec 15",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "CV Submissions",
    value: "24",
    change: "8 new",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Contact Submissions",
    value: "15",
    change: "3 unread",
    icon: MessageSquare,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const recentActivity = [
  {
    action: "New CV submitted",
    item: "John Smith - Senior Software Engineer",
    time: "1 hour ago",
    type: "cv",
  },
  {
    action: "New notice published",
    item: "Q3 Financial Results Released",
    time: "2 hours ago",
    type: "notice",
  },
  {
    action: "Meeting scheduled",
    item: "Annual General Meeting 2024",
    time: "1 day ago",
    type: "meeting",
  },
  {
    action: "Contact form submitted",
    item: "Partnership inquiry from Sarah Johnson",
    time: "2 days ago",
    type: "contact",
  },
]

export function AdminDashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-10">
          <div className="w-32 h-32 relative">
            <Image src="/images/amaraa-logo-gold.png" alt="House of Amaraa" fill className="object-contain" />
          </div>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-blue-100">Managing the House of Amaraa administrative operations.</p>
            <p className="text-blue-200 text-sm mt-1 italic">Royalty • Wisdom • Legacy</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-12 h-12 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates across all sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500 truncate">{activity.item}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Create New Notice
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              View Contact Submissions
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Review CV Submissions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
