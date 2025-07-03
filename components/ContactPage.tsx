"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Building2, Briefcase, GlobeIcon, Loader2 } from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  submittedAt: string
}

const globalLocations = [
  {
    country: "Luxembourg",
    flag: "🇱🇺",
    title: "Headquarters",
    address: "15 Rue Edward Steichen, L-2540 Luxembourg City, Grand Duchy of Luxembourg",
    focus: "Global Holding HQ; Strategic Governance; Corporate Control",
    icon: Building2,
  },
  {
    country: "Switzerland",
    flag: "🇨🇭",
    title: "Swiss Operations",
    address: "Rue du Rhône 118, 1204 Geneva, Switzerland",
    focus: "High Horology Brand; Swiss Precision Manufacturing",
    icon: GlobeIcon,
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    title: "Asia Pacific Hub",
    address: "80 Robinson Road, #10-01, Singapore 068898",
    focus: "Venture Capital, Innovation, Logistics Intelligence",
    icon: Briefcase,
  },
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    title: "Capital & MENA Region",
    address: "Unit 502, Level 5, Index Tower, Dubai International Financial Centre, Dubai, UAE",
    focus: "Capital Markets; M&A; Regional Investments",
    icon: Building2,
  },
  {
    country: "United States",
    flag: "🇺🇸",
    title: "North American Investment Arm",
    address: "745 Fifth Avenue, Suite 500, New York, NY 10151, USA",
    focus: "US Strategic Equity, Partnerships, Deal Structuring",
    icon: Briefcase,
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    title: "Family Office & Capital Markets",
    address: "1 Mayfair Place, London W1J 8AJ, United Kingdom",
    focus: "Family Office, Wealth Structuring, Asset Management",
    icon: GlobeIcon,
  },
  {
    country: "India",
    flag: "🇮🇳",
    title: "Development & Strategic Talent",
    address: "10th floor Panchsil Business Park, Laxman Nagar, Baner, Pune 411045",
    focus: "Technology, ESG, Research, Compliance Back Office",
    icon: Building2,
  },
  {
    country: "Ireland",
    flag: "🇮🇪",
    title: "IP & Patent Holding",
    address: "The Academy, 42 Pearse St, Dublin 2",
    focus: "IP-Patent Holding; Aircraft Leasing",
    icon: Briefcase,
  },
]

interface PhoneInputProps {
  onChange: (e: { target: { name: string; value: string } }) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>
  name: string
  value?: string
  required?: boolean
}

const PhoneInput = ({ onChange, onBlur, name }: PhoneInputProps) => {
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("")

  const countryCodes = [
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+352", flag: "🇱🇺" },
    { code: "+41", flag: "🇨🇭" },
    { code: "+65", flag: "🇸🇬" },
    { code: "+971", flag: "🇦🇪" },
    { code: "+91", flag: "🇮🇳" },
    { code: "+353", flag: "🇮🇪" },
  ]

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/\D/g, "")
    if (numbersOnly.length > 15) return
    setPhoneNumber(numbersOnly)
    onChange({ target: { name, value: `${countryCode} ${numbersOnly}` } })
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value
    setCountryCode(newCode)
    onChange({ target: { name, value: `${newCode} ${phoneNumber}` } })
  }

  return (
    <div className="flex">
      <select
        value={countryCode}
        onChange={handleCountryChange}
        onBlur={onBlur}
        className="px-3 py-2 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#c6a35d] focus:border-[#c6a35d]"
      >
        {countryCodes.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>
      <Input
        value={phoneNumber}
        onChange={handlePhoneChange}
        onBlur={onBlur}
        className="rounded-l-none border-gray-300 dark:border-gray-700 focus:border-[#c6a35d] focus:ring-[#c6a35d] flex-1"
        placeholder="Phone number"
      />
    </div>
  )
}

export function ContactPage() {
  const [selectedLocation, setSelectedLocation] = useState(globalLocations[0])
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newSubmission: ContactSubmission = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date().toISOString(),
    }

    setSubmissions((prev) => [newSubmission, ...prev])
    setFormData({ name: "", email: "", phone: "", message: "" })
    setSubmitSuccess(true)
    setIsSubmitting(false)

    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-[#c6a35d] mb-4">Global Presence</h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Connect with House of Amaraa across our worldwide network of strategic locations.
        </p>
      </div>

      {/* Locations */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="text-3xl font-bold mb-6">Our Offices</h2>
          <div className="space-y-3">
            {globalLocations.map((location) => (
              <button
                key={location.country}
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedLocation.country === location.country
                    ? "border-[#c6a35d] bg-white dark:bg-gray-800 shadow-lg scale-105"
                    : "border-transparent bg-gray-50 dark:bg-gray-900 hover:bg-white hover:dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{location.flag}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{location.country}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{location.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <Card className="h-full">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl">{selectedLocation.flag}</span>
                <div>
                  <h4 className="text-2xl font-bold">{selectedLocation.country}</h4>
                  <p className="text-[#c6a35d] font-semibold text-lg">{selectedLocation.title}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">{selectedLocation.address}</p>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">{selectedLocation.focus}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">Get in Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Ready to explore opportunities with House of Amaraa? Reach out for partnerships, investments, or general
            inquiries. Our team is ready to connect with you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-12 h-12 bg-[#c6a35d]/10 flex-shrink-0 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#c6a35d]" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+91 22 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-12 h-12 bg-[#c6a35d]/10 flex-shrink-0 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#c6a35d]" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">info@amaraaglobal.com</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card className="shadow-2xl">
            <CardContent className="p-8 sm:p-10">
              <h3 className="text-3xl font-bold mb-8">Send us a Message</h3>
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-200">
                    Message sent successfully! Well get back to you soon.
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <PhoneInput name="phone" value={formData.phone} onChange={handlePhoneChange} required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="resize-none"
                    placeholder="Tell us about your inquiry..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#c6a35d] text-white font-bold text-lg hover:bg-[#b8954f] transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Submissions Display (for demo purposes) */}
      {submissions.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Recent Contact Submissions</h3>
          <div className="grid gap-4">
            {submissions.slice(0, 3).map((submission) => (
              <Card key={submission.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{submission.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{submission.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{submission.phone}</p>
                    <p className="text-sm mt-2">{submission.message}</p>
                  </div>
                  <div className="text-xs text-gray-500">{new Date(submission.submittedAt).toLocaleDateString()}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
