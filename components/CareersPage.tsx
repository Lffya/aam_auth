"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Heart,
  MapPin,
  Clock,
  TrendingUp,
  Lightbulb,
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
  Building2,
  Award,
  Target,
} from "lucide-react"

const careerJourney = [
  {
    phase: "01",
    title: "Discover Your Path",
    description:
      "Explore diverse opportunities across our global portfolio that align with your passion and expertise.",
    icon: Target,
    color: "bg-gradient-to-br from-[#c6a35d] to-[#d4b366]",
  },
  {
    phase: "02",
    title: "Connect & Engage",
    description: "Join our community of innovators and learn about our culture, values, and growth opportunities.",
    icon: Users,
    color: "bg-gradient-to-br from-[#232323] to-[#3a3a3a]",
  },
  {
    phase: "03",
    title: "Grow & Develop",
    description: "Accelerate your skills through mentorship, training, and meaningful projects that create impact.",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-[#c6a35d] to-[#d4b366]",
  },
  {
    phase: "04",
    title: "Lead Innovation",
    description: "Shape the future by taking on leadership roles and driving breakthrough solutions worldwide.",
    icon: Award,
    color: "bg-gradient-to-br from-[#232323] to-[#3a3a3a]",
  },
]

const benefits = [
  {
    category: "Financial Growth",
    icon: TrendingUp,
    color: "bg-[#c6a35d]",
    items: [
      "Competitive compensation with performance incentives",
      "Equity participation and profit sharing programs",
      "Comprehensive insurance and medical coverage",
      "Retirement planning and financial advisory services",
    ],
  },
  {
    category: "Work-Life Harmony",
    icon: Heart,
    color: "bg-[#232323]",
    items: [
      "Flexible hybrid working arrangements",
      "Unlimited PTO and sabbatical programs",
      "Remote work and digital nomad support",
      "Family care and parental leave benefits",
    ],
  },
  {
    category: "Professional Development",
    icon: Lightbulb,
    color: "bg-[#c6a35d]",
    items: [
      "Executive mentorship and coaching programs",
      "Leadership development and succession planning",
      "Conference attendance and education sponsorship",
      "Cross-functional and international assignments",
    ],
  },
  {
    category: "Global Impact",
    icon: Globe,
    color: "bg-[#232323]",
    items: [
      "International mobility and relocation support",
      "Community impact and volunteer programs",
      "Sustainability initiatives and green projects",
      "Cultural exchange and diversity programs",
    ],
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Data Scientist",
    department: "Technology Division",
    quote:
      "At Amaraa, I'm not just analyzing data—I'm helping shape the future of sustainable agriculture. The impact we create here goes far beyond spreadsheets and transforms real lives.",
    tenure: "3 years",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Operations Manager",
    department: "Aviation Division",
    quote:
      "The diversity of challenges keeps me engaged every day. From optimizing flight routes to implementing eco-friendly practices, no two days are the same here.",
    tenure: "5 years",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Sustainability Lead",
    department: "Corporate Strategy",
    quote:
      "Working here means being part of something bigger. Every project contributes to our mission of creating a more sustainable and prosperous world for future generations.",
    tenure: "2 years",
    rating: 5,
  },
]

const openRoles = [
  {
    title: "Senior Software Engineer",
    department: "IT Services",
    location: "Mumbai, India",
    type: "Full-time",
    level: "Senior",
    urgent: true,
    salary: "₹25-35L",
  },
  {
    title: "Sustainability Analyst",
    department: "Environmental Solutions",
    location: "Remote",
    type: "Full-time",
    level: "Mid-level",
    urgent: false,
    salary: "₹18-25L",
  },
  {
    title: "Aviation Safety Inspector",
    department: "Aviation",
    location: "Dubai, UAE",
    type: "Full-time",
    level: "Senior",
    urgent: true,
    salary: "AED 180-220K",
  },
  {
    title: "Agricultural Research Scientist",
    department: "Agro Group",
    location: "Bangalore, India",
    type: "Full-time",
    level: "Senior",
    urgent: false,
    salary: "₹22-28L",
  },
  {
    title: "Financial Analyst",
    department: "Financial Services",
    location: "London, UK",
    type: "Full-time",
    level: "Entry",
    urgent: false,
    salary: "£45-55K",
  },
  {
    title: "Cybersecurity Specialist",
    department: "Security Shield",
    location: "Hyderabad, India",
    type: "Full-time",
    level: "Mid-level",
    urgent: true,
    salary: "₹20-28L",
  },
  {
    title: "Logistics Coordinator",
    department: "Logistics",
    location: "Singapore",
    type: "Full-time",
    level: "Mid-level",
    urgent: false,
    salary: "SGD 60-75K",
  },
  {
    title: "Real Estate Development Manager",
    department: "Real Estate",
    location: "New York, USA",
    type: "Full-time",
    level: "Senior",
    urgent: false,
    salary: "$120-150K",
  },
]

const stats = [
  { number: "100K+", label: "Global Professionals", icon: Users },
  { number: "25+", label: "Countries", icon: Globe },
  { number: "21", label: "Business Units", icon: Building2 },
  { number: "95%", label: "Employee Satisfaction", icon: Heart },
]

export function CareersPage() {
  const [showAllJobs, setShowAllJobs] = useState(false)
  const displayedRoles = showAllJobs ? openRoles : openRoles.slice(0, 5)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#232323] dark:text-white leading-tight">
          Shape Tomorrow
          <span className="block text-[#c6a35d]">With Purpose</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Join a legacy where innovation meets impact. Where your ambitions align with purpose, and every career becomes
          part of our greater story of transformation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="group px-8 py-4 bg-[#c6a35d] hover:bg-[#b8954f] text-white font-semibold">
            <span>Explore Opportunities</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 text-center hover:shadow-lg transition-shadow">
            <stat.icon className="w-8 h-8 text-[#c6a35d] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#232323] dark:text-white mb-2">{stat.number}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Career Journey */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#232323] dark:text-white mb-4">Your Growth Timeline</h2>
        </div>
        <div className="relative border-l-4 border-[#c6a35d]/30 pl-6 space-y-8">
          {careerJourney.map((phase) => (
            <div key={phase.phase} className="relative group">
              <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-[#c6a35d] flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {phase.phase}
              </div>
              <Card className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${phase.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#232323] dark:text-white">{phase.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{phase.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#232323] dark:text-white mb-6">Voices from Our Family</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-8 h-full hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#c6a35d]/20 flex items-center justify-center border-2 border-[#c6a35d]">
                  <Users className="w-8 h-8 text-[#c6a35d]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-[#232323] dark:text-white">{testimonial.name}</h3>
                  <p className="text-[#c6a35d] font-semibold text-sm">{testimonial.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.department}</p>
                </div>
              </div>
              <blockquote className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex text-[#c6a35d]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{testimonial.tenure} at Amaraa</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#232323] dark:text-white mb-6">Beyond Compensation</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.category} className="p-8 h-full hover:shadow-xl transition-shadow">
              <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-6`}>
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#232323] dark:text-white mb-6">{benefit.category}</h3>
              <ul className="space-y-4">
                {benefit.items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#c6a35d] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#232323] dark:text-white mb-6">Current Opportunities</h2>
        </div>
        <div className="space-y-6">
          {displayedRoles.map((role, index) => (
            <Card key={`${role.title}-${index}`} className="p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#232323] dark:text-white hover:text-[#c6a35d] transition-colors">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Building2 className="w-4 h-4" />
                      <span>{role.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{role.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{role.type}</span>
                    </div>
                    {role.urgent && <Badge className="bg-red-100 text-red-800">Urgent</Badge>}
                  </div>
                  <div className="text-lg font-semibold text-[#c6a35d]">{role.salary}</div>
                </div>
                <div className="flex-shrink-0">
                  <Button className="w-full sm:w-auto px-8 py-4 bg-[#232323] dark:bg-white text-white dark:text-[#232323] hover:bg-[#c6a35d] dark:hover:bg-[#c6a35d] dark:hover:text-white font-semibold">
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button
            onClick={() => setShowAllJobs(!showAllJobs)}
            variant="outline"
            className="px-10 py-4 border-2 border-[#c6a35d] text-[#c6a35d] hover:bg-[#c6a35d] hover:text-white"
          >
            {showAllJobs ? "Show Less Positions" : "View All Open Positions"}
          </Button>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-8 py-20 bg-gradient-to-br from-[#f0efe2] via-white to-[#c6a35d]/10 dark:from-[#232323] dark:via-[#1a1a1a] dark:to-[#c6a35d]/5 rounded-2xl">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#232323] dark:text-white leading-tight">
          Ready to Write Your <span className="block text-[#c6a35d]">Success Story?</span>
        </h2>
        <Button className="px-12 py-5 bg-[#c6a35d] hover:bg-[#b8954f] text-white font-semibold text-lg hover:scale-105 transition-transform">
          Start Your Journey Today
        </Button>
      </div>
    </div>
  )
}
