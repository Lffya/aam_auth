"use client"

import { Button } from "@/components/ui/button"
import { FileText, Calendar, Users, Phone, Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    hasSubmenu: false,
  },
  {
    id: "notices",
    label: "Notices & Announcements",
    icon: FileText,
    hasSubmenu: false,
  },
  {
    id: "meetings",
    label: "Meeting Information",
    icon: Calendar,
    hasSubmenu: false,
  },
  {
    id: "careers",
    label: "Careers",
    icon: Users,
    hasSubmenu: false,
  },
  {
    id: "cvs",
    label: "CV Submissions",
    icon: FileText,
    hasSubmenu: false,
  },
  {
    id: "contact",
    label: "Contact Us",
    icon: Phone,
    hasSubmenu: false,
  },
]

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Amaraa Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3 text-left font-normal",
                isActive ? "bg-blue-50 text-blue-700 hover:bg-blue-50" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.hasSubmenu && <ChevronRight className="h-4 w-4 text-gray-400" />}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">© 2025 Amaraa Global</p>
      </div>
    </div>
  )
}
