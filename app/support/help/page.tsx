import { ArrowLeft, Search, Book, Video, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function HelpPage() {
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
            Help Center
          </h1>
          <p className="text-gray-600 text-lg">Find answers to your questions and learn how to use PhotoResize</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Book className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Learn the basics of using PhotoResize</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-blue-600 hover:underline">How to upload images</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">Basic image editing</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">Downloading your results</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">Supported file formats</Link></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Video className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Watch step-by-step video guides</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-blue-600 hover:underline">Resizing images tutorial</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">Cropping images guide</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">Applying filters</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">Background removal</Link></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Frequently asked questions</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-blue-600 hover:underline">Is PhotoResize free?</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">File size limitations</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">Privacy and security</Link></li>
                <li><Link href="#" className="text-blue-600 hover:underline">Browser compatibility</Link></li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Popular Help Articles</h2>
          <div className="space-y-4">
            {[
              {
                title: "How to resize images while maintaining quality",
                description: "Learn the best practices for resizing images without losing quality",
                category: "Image Editing"
              },
              {
                title: "Understanding aspect ratios and cropping",
                description: "Master the art of cropping images with perfect proportions",
                category: "Cropping"
              },
              {
                title: "Removing backgrounds from images",
                description: "Step-by-step guide to remove backgrounds effectively",
                category: "Background Removal"
              },
              {
                title: "Converting between image formats",
                description: "When and how to convert between JPG, PNG, and WebP",
                category: "File Formats"
              },
              {
                title: "Troubleshooting upload issues",
                description: "Solutions for common problems when uploading images",
                category: "Troubleshooting"
              }
            ].map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-2">{article.description}</p>
                      <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Link href="/support/contact">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
