import { ArrowLeft, MapPin, Clock, DollarSign, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const jobOpenings = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "Join our team to build the next generation of browser-based image editing tools using React, Next.js, and WebAssembly.",
    requirements: ["5+ years React experience", "Canvas API expertise", "WebAssembly knowledge", "Performance optimization skills"]
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time", 
    salary: "$90k - $120k",
    description: "Design intuitive interfaces that make complex image editing accessible to everyone.",
    requirements: ["3+ years UI/UX experience", "Figma proficiency", "Web design expertise", "User research skills"]
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $140k",
    description: "Scale our infrastructure to serve millions of users while maintaining 99.9% uptime.",
    requirements: ["AWS/GCP experience", "Docker & Kubernetes", "CI/CD pipelines", "Monitoring & alerting"]
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $170k",
    description: "Drive product strategy and roadmap for our image editing platform.",
    requirements: ["5+ years product management", "Technical background", "User research experience", "Data-driven approach"]
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Join Our Team
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Help us build the future of image editing while working with a passionate, remote-first team
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Remote First</h3>
                <p className="text-sm text-gray-600">Work from anywhere in the world</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Flexible Hours</h3>
                <p className="text-sm text-gray-600">Choose your own schedule</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Competitive Pay</h3>
                <p className="text-sm text-gray-600">Top-tier compensation packages</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Global Team</h3>
                <p className="text-sm text-gray-600">Diverse, international colleagues</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Why Work at PhotoResize?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Our Culture</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Privacy-first mindset in everything we do</li>
                    <li>• Open source contributions encouraged</li>
                    <li>• Continuous learning and growth opportunities</li>
                    <li>• Transparent communication and decision making</li>
                    <li>• Work-life balance is a priority</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Benefits</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Comprehensive health, dental, and vision insurance</li>
                    <li>• $2,000 annual learning and development budget</li>
                    <li>• Top-tier equipment and home office setup</li>
                    <li>• Unlimited PTO policy</li>
                    <li>• Stock options in a growing company</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline">{job.location}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        {job.salary}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-gray-600">• {req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Don't See Your Role?</h3>
              <p className="text-gray-600 mb-6">
                We're always looking for talented individuals who share our passion for privacy, 
                accessibility, and great user experiences. Send us your resume and tell us how 
                you'd like to contribute to PhotoResize.
              </p>
              <Link href="/support/contact">
                <Button variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
