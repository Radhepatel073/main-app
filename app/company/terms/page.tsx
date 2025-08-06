import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">Last updated: January 2024</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-600">
                By accessing and using PhotoResize ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                PhotoResize is a free, browser-based image editing service that allows users to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Resize images to custom dimensions</li>
                <li>• Crop images with various aspect ratios</li>
                <li>• Rotate and flip images</li>
                <li>• Apply filters and adjustments</li>
                <li>• Remove backgrounds from images</li>
                <li>• Convert between image formats</li>
              </ul>
              <p className="text-gray-600 mt-4">
                All image processing occurs locally in your browser. No images are uploaded to our servers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">You agree to:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Use the Service only for lawful purposes</li>
                <li>• Not process images that violate copyright, trademark, or other intellectual property rights</li>
                <li>• Not use the Service to process illegal, harmful, or offensive content</li>
                <li>• Not attempt to reverse engineer, hack, or compromise the Service</li>
                <li>• Not use automated tools to access the Service excessively</li>
                <li>• Respect the rights and privacy of others</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold mb-2">Your Content</h4>
                  <p>
                    You retain all rights to images you process through PhotoResize. We do not claim any ownership 
                    or rights to your content. Since processing occurs in your browser, we never have access to your images.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Our Service</h4>
                  <p>
                    The PhotoResize service, including its design, code, and functionality, is protected by copyright 
                    and other intellectual property laws. You may not copy, modify, or distribute our service without permission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Privacy and Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                PhotoResize is designed with privacy as a core principle:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• All image processing occurs in your browser</li>
                <li>• No images are uploaded to or stored on our servers</li>
                <li>• We do not collect personal information</li>
                <li>• Anonymous usage analytics may be collected to improve the service</li>
                <li>• See our Privacy Policy for complete details</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Service Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <p>
                  We strive to maintain high availability of the PhotoResize service, but we cannot guarantee 
                  uninterrupted access. The service may be temporarily unavailable due to:
                </p>
                <ul className="space-y-2">
                  <li>• Scheduled maintenance</li>
                  <li>• Technical issues</li>
                  <li>• Third-party service disruptions</li>
                  <li>• Force majeure events</li>
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue the service at any time with or without notice.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Service "As Is":</strong> PhotoResize is provided "as is" without warranties of any kind, 
                  either express or implied, including but not limited to warranties of merchantability, fitness for 
                  a particular purpose, or non-infringement.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> In no event shall PhotoResize be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
                  data, use, goodwill, or other intangible losses.
                </p>
                <p>
                  <strong>Browser Compatibility:</strong> The service depends on modern browser features. We cannot 
                  guarantee compatibility with all browsers or devices.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Indemnification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                You agree to indemnify and hold harmless PhotoResize and its affiliates from any claims, damages, 
                losses, or expenses (including attorney fees) arising from your use of the service, violation of these 
                terms, or infringement of any rights of another party.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], 
                without regard to its conflict of law provisions. Any disputes arising under these terms shall be 
                subject to the exclusive jurisdiction of the courts in [Jurisdiction].
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting to this page. Your continued use of the service after any changes constitutes acceptance of 
                the new terms. We encourage you to review these terms periodically.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> legal@photoresize.com</p>
                <p><strong>Address:</strong> PhotoResize Legal Team, 123 Tech Street, Digital City, DC 12345</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These terms are effective as of January 2024. By using PhotoResize, 
                you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
