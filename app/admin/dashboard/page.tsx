"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, FileText, Calendar } from "lucide-react"
import { NoticesTab } from "@/components/NoticesTab"
import { MeetingsTab } from "@/components/MeetingsTab"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin-authenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
      return
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated")
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="notices" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notices & Announcements
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Meeting Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notices" className="mt-6">
            <NoticesTab />
          </TabsContent>

          <TabsContent value="meetings" className="mt-6">
            <MeetingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
