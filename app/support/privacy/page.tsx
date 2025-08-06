import { ArrowLeft, Shield, Eye, Lock, Server } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">Your privacy is our top priority</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">100% Private</h3>
                <p className="text-sm text-gray-600">All processing happens in your browser</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Eye className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">No Tracking</h3>
                <p className="text-sm text-gray-600">We don't track or store your images</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Lock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Secure</h3>
                <p className="text-sm text-gray-600">Your data never leaves your device</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Server className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">No Uploads</h3>
                <p className="text-sm text-gray-600">Images are not uploaded to servers</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>How PhotoResize Protects Your Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  PhotoResize is designed with privacy as a fundamental principle. Unlike many online image editors, 
                  we process all images directly in your web browser using client-side JavaScript and HTML5 Canvas technology.
                </p>
                <p className="text-gray-600">
                  This means your images never leave your device, are never uploaded to our servers, and are never 
                  stored or cached anywhere except temporarily in your browser's memory during processing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Don't Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Your images or any visual content you process</li>
                  <li>• Personal information or account details (no registration required)</li>
                  <li>• File names, metadata, or EXIF data from your images</li>
                  <li>• IP addresses or device identifiers for tracking purposes</li>
                  <li>• Browsing history or usage patterns</li>
                  <li>• Location data or geographic information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We May Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We may collect minimal, anonymous analytics data to improve our service:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• General usage statistics (page views, feature usage)</li>
                  <li>• Browser type and version for compatibility purposes</li>
                  <li>• Error reports to help us fix bugs (no personal data included)</li>
                  <li>• Performance metrics to optimize loading times</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  This data is aggregated, anonymized, and cannot be used to identify individual users.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies and Local Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  PhotoResize uses minimal cookies and local storage for:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Remembering your preferred settings (quality, format preferences)</li>
                  <li>• Storing temporary image data during processing sessions</li>
                  <li>• Basic analytics (if you haven't opted out)</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can clear this data at any time through your browser settings. No personal information 
                  is stored in cookies or local storage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  PhotoResize may use the following third-party services:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Google Analytics:</strong> For anonymous usage statistics (can be opted out)</li>
                  <li>• <strong>CDN Services:</strong> For faster loading of static assets</li>
                  <li>• <strong>Error Monitoring:</strong> For detecting and fixing technical issues</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  These services do not have access to your images or personal data processed through PhotoResize.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Since your images are processed entirely in your browser:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• No data transmission to external servers for image processing</li>
                  <li>• All processing happens over HTTPS for secure communication</li>
                  <li>• Images are automatically cleared from browser memory when you close the tab</li>
                  <li>• No permanent storage of your content on any servers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Since we don't collect personal data, most data protection rights don't apply. However:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• You can opt out of analytics tracking</li>
                  <li>• You can clear all local data through your browser</li>
                  <li>• You can contact us with any privacy concerns</li>
                  <li>• You have complete control over your images at all times</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> privacy@photoresize.com</p>
                  <p><strong>Address:</strong> PhotoResize Privacy Team, 123 Tech Street, Digital City, DC 12345</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. We encourage you to review this Privacy Policy periodically 
                  to stay informed about how we protect your privacy.
                </p>
                <p className="text-gray-600 mt-4">
                  <strong>Last updated:</strong> January 2024
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
