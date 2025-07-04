"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/AdminSidebar"
import { AdminHeader } from "@/components/AdminHeader"
import { NoticesTab } from "@/components/NoticesTab"
import { MeetingsTab } from "@/components/MeetingsTab"
import { CareersTab } from "@/components/CareersTab"
import { ContactTab } from "@/components/ContactTab"
import { AdminDashboardHome } from "@/components/AdminDashboardHome"
import { CVTab } from "@/components/CVTab"
import { NewsTab } from "@/components/NewsTab"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("dashboard")

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

  const renderContent = () => {
    switch (activeSection) {
      case "notices":
        return <NoticesTab />
      case "news":
        return <NewsTab />
      case "meetings":
        return <MeetingsTab />
      case "careers":
        return <CareersTab />
      case "cvs":
        return <CVTab />
      case "contact":
        return <ContactTab />
      default:
        return <AdminDashboardHome />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
