import { ArrowLeft, Users, Target, Award, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
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
            About PhotoResize
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Making image editing accessible, private, and free for everyone around the world
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                PhotoResize was born from a simple frustration: why should you need expensive software or 
                compromise your privacy just to resize an image? In 2024, we set out to create a solution 
                that puts users first - completely free, entirely private, and accessible to everyone.
              </p>
              <p className="text-gray-600">
                Built with modern web technologies, PhotoResize processes everything directly in your browser, 
                ensuring your images never leave your device. What started as a simple resizing tool has grown 
                into a comprehensive image editing platform used by millions worldwide.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">5M+ Users</h3>
                <p className="text-sm text-gray-600">Trusted by millions worldwide</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">100% Free</h3>
                <p className="text-sm text-gray-600">No hidden costs or subscriptions</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-gray-600">Your data stays on your device</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Open Source</h3>
                <p className="text-sm text-gray-600">Built with transparency</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                To democratize image editing by providing powerful, professional-grade tools that are:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Accessible:</strong> No downloads, installations, or technical expertise required</li>
                <li>• <strong>Private:</strong> Your images and data remain completely under your control</li>
                <li>• <strong>Free:</strong> Professional tools shouldn't be locked behind paywalls</li>
                <li>• <strong>Fast:</strong> Instant processing without server delays</li>
                <li>• <strong>Reliable:</strong> Works consistently across all devices and browsers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-blue-600">Privacy by Design</h3>
                  <p className="text-gray-600 text-sm">
                    We built PhotoResize so your images never leave your device. Privacy isn't an afterthought - it's fundamental to how we operate.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-green-600">Simplicity</h3>
                  <p className="text-gray-600 text-sm">
                    Powerful doesn't have to mean complicated. We believe the best tools are the ones that get out of your way.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-purple-600">Accessibility</h3>
                  <p className="text-gray-600 text-sm">
                    Everyone deserves access to quality image editing tools, regardless of their budget or technical background.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-red-600">Innovation</h3>
                  <p className="text-gray-600 text-sm">
                    We're constantly exploring new ways to make image editing faster, easier, and more powerful.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                PhotoResize is built using cutting-edge web technologies:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Frontend</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• React & Next.js for the user interface</li>
                    <li>• HTML5 Canvas for image processing</li>
                    <li>• WebAssembly for performance-critical operations</li>
                    <li>• Progressive Web App capabilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Client-side image processing</li>
                    <li>• Real-time preview updates</li>
                    <li>• Responsive design for all devices</li>
                    <li>• Offline functionality</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Future Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We're constantly working to improve PhotoResize. Here's what's coming:
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Advanced AI Features</h4>
                    <p className="text-sm text-gray-600">Smart cropping, object removal, and style transfer</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Batch Processing</h4>
                    <p className="text-sm text-gray-600">Edit multiple images simultaneously</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Mobile Apps</h4>
                    <p className="text-sm text-gray-600">Native iOS and Android applications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">API Access</h4>
                    <p className="text-sm text-gray-600">Integrate PhotoResize into your own applications</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Join Our Community</h3>
              <p className="text-gray-600 mb-6">
                PhotoResize is more than just a tool - it's a community of creators, designers, and everyday users 
                who believe in accessible, private image editing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support/contact">
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors">
                    Get in Touch
                  </button>
                </Link>
                <Link href="/company/careers">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Join Our Team
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
