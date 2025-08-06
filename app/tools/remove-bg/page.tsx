"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, Download, ArrowLeft, Eraser } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function RemoveBackgroundPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setProcessedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const removeBackground = useCallback(async () => {
    if (!selectedImage || !canvasRef.current) return

    setIsProcessing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      if (!ctx) return

      // Draw the original image
      ctx.drawImage(img, 0, 0)
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Simple background removal (this is a basic implementation)
      // In a real app, you'd use a more sophisticated algorithm or API
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        
        // Remove white/light backgrounds (simple threshold)
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0 // Set alpha to 0 (transparent)
        }
      }

      // Put the modified image data back
      ctx.putImageData(imageData, 0, 0)
      
      // Convert to data URL
      const processedDataUrl = canvas.toDataURL('image/png')
      setProcessedImage(processedDataUrl)
      setIsProcessing(false)
    }
    
    img.src = selectedImage
  }, [selectedImage])

  const downloadImage = useCallback(() => {
    if (!processedImage) return

    const a = document.createElement('a')
    a.href = processedImage
    a.download = `no-background-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [processedImage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Remove Background
          </h1>
          <p className="text-gray-600">Automatically remove backgrounds from your images</p>
        </div>

        {!selectedImage ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Eraser className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
                <p className="text-gray-600 mb-4">Click here or drag and drop your image</p>
                <div className="flex justify-center gap-2">
                  <Badge variant="secondary">JPG</Badge>
                  <Badge variant="secondary">PNG</Badge>
                  <Badge variant="secondary">WEBP</Badge>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Original Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                    <img src={selectedImage || "/placeholder.svg"} alt="Original" className="max-w-full max-h-[400px] object-contain" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Background Removed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-transparent rounded-lg p-4 flex items-center justify-center min-h-[300px]" 
                       style={{backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'}}>
                    {processedImage ? (
                      <img src={processedImage || "/placeholder.svg"} alt="Processed" className="max-w-full max-h-[400px] object-contain" />
                    ) : (
                      <div className="text-center text-gray-500">
                        <Eraser className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Processed image will appear here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              {!processedImage ? (
                <Button 
                  onClick={removeBackground} 
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Eraser className="w-4 h-4 mr-2" />
                      Remove Background
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={downloadImage}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              )}

              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedImage(null)
                  setProcessedImage(null)
                }}
                className="ml-4"
              >
                Upload Different Image
              </Button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This is a basic background removal tool. For best results with complex backgrounds, 
                consider using professional tools or AI-powered services.
              </p>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
