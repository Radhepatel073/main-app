"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "Is PhotoResize completely free to use?",
        answer: "Yes! PhotoResize is completely free to use. There are no hidden fees, subscriptions, or premium features. All image editing tools are available to everyone at no cost."
      },
      {
        question: "Do I need to create an account to use PhotoResize?",
        answer: "No account is required! You can start editing images immediately without any registration or sign-up process."
      },
      {
        question: "What image formats are supported?",
        answer: "PhotoResize supports all major image formats including JPG, PNG, GIF, WebP, and BMP for input. You can export your edited images as JPG, PNG, or WebP."
      }
    ]
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Are my images uploaded to your servers?",
        answer: "No! All image processing happens directly in your browser. Your images never leave your device, ensuring complete privacy and security."
      },
      {
        question: "Do you store or track my images?",
        answer: "We do not store, track, or have access to any of your images. Everything is processed locally on your device."
      },
      {
        question: "Is it safe to edit sensitive images?",
        answer: "Yes, it's completely safe. Since all processing happens in your browser and nothing is uploaded to our servers, your sensitive images remain private."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        question: "What browsers are supported?",
        answer: "PhotoResize works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
      },
      {
        question: "Is there a file size limit?",
        answer: "While there's no strict server-side limit, very large files (over 50MB) may cause performance issues depending on your device's capabilities."
      },
      {
        question: "Why is my image processing slowly?",
        answer: "Processing speed depends on your device's performance and the image size. Larger images or older devices may take longer to process."
      }
    ]
  },
  {
    category: "Features",
    questions: [
      {
        question: "Can I resize images without losing quality?",
        answer: "Yes! PhotoResize uses advanced algorithms to maintain image quality when resizing. However, enlarging images significantly may result in some quality loss."
      },
      {
        question: "How does the background removal feature work?",
        answer: "Our background removal tool uses browser-based algorithms to detect and remove backgrounds. For complex backgrounds, results may vary."
      },
      {
        question: "Can I batch process multiple images?",
        answer: "Currently, PhotoResize processes one image at a time. Batch processing is a feature we're considering for future updates."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

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
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">Find quick answers to common questions</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`
                  const isOpen = openItems.includes(itemId)
                  
                  return (
                    <Card key={faqIndex} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredFAQ.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQ items found matching "{searchTerm}"</p>
              <Button 
                onClick={() => setSearchTerm("")}
                variant="outline"
                className="mt-4"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our support team is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support/contact">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/support/help">
                  <Button variant="outline">
                    Browse Help Center
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
