"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, Users, Phone } from "lucide-react"
import { NoticesPage } from "@/components/NoticesPage"
import { MeetingsPage } from "@/components/MeetingsPage"
import { CareersPage } from "@/components/CareersPage"
import { ContactPage } from "@/components/ContactPage"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <Image src="/images/amaraa-logo-beige.png" alt="House of Amaraa" fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#c6a35d]">House of Amaraa</h1>
                <p className="text-xs text-gray-500">Royalty • Wisdom • Legacy</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <a href="/admin">Admin Panel</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="notices" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="notices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notices & Announcements
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Meeting Information
            </TabsTrigger>
            <TabsTrigger value="careers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Careers
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notices">
            <NoticesPage />
          </TabsContent>

          <TabsContent value="meetings">
            <MeetingsPage />
          </TabsContent>

          <TabsContent value="careers">
            <CareersPage />
          </TabsContent>

          <TabsContent value="contact">
            <ContactPage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
