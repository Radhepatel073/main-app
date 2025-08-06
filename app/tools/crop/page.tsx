"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, Download, ArrowLeft, Crop } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function CropPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const cropImage = useCallback(async (aspectRatio: string) => {
    if (!selectedImage || !canvasRef.current) return

    setIsProcessing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      let cropWidth = img.width
      let cropHeight = img.height
      let cropX = 0
      let cropY = 0

      // Calculate crop dimensions based on aspect ratio
      switch (aspectRatio) {
        case '1:1':
          const size = Math.min(img.width, img.height)
          cropWidth = cropHeight = size
          cropX = (img.width - size) / 2
          cropY = (img.height - size) / 2
          break
        case '16:9':
          if (img.width / img.height > 16/9) {
            cropHeight = img.height
            cropWidth = img.height * (16/9)
            cropX = (img.width - cropWidth) / 2
          } else {
            cropWidth = img.width
            cropHeight = img.width * (9/16)
            cropY = (img.height - cropHeight) / 2
          }
          break
        case '4:3':
          if (img.width / img.height > 4/3) {
            cropHeight = img.height
            cropWidth = img.height * (4/3)
            cropX = (img.width - cropWidth) / 2
          } else {
            cropWidth = img.width
            cropHeight = img.width * (3/4)
            cropY = (img.height - cropHeight) / 2
          }
          break
      }

      canvas.width = cropWidth
      canvas.height = cropHeight

      if (!ctx) return

      ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `cropped-${aspectRatio}-${Date.now()}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
        setIsProcessing(false)
      }, 'image/png')
    }
    
    img.src = selectedImage
  }, [selectedImage])

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
            Crop Image
          </h1>
          <p className="text-gray-600">Crop your images to perfect aspect ratios</p>
        </div>

        {!selectedImage ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Crop className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Upload Image to Crop</h3>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                <CardTitle>Crop Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 mb-6">Choose an aspect ratio to crop your image:</p>
                
                <Button 
                  onClick={() => cropImage('1:1')} 
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded mr-3"></div>
                  Square (1:1) - Perfect for profile pictures
                </Button>

                <Button 
                  onClick={() => cropImage('16:9')} 
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <div className="w-8 h-4 bg-green-500 rounded mr-3"></div>
                  Widescreen (16:9) - Great for banners
                </Button>

                <Button 
                  onClick={() => cropImage('4:3')} 
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <div className="w-6 h-5 bg-purple-500 rounded mr-3"></div>
                  Standard (4:3) - Classic photo ratio
                </Button>

                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Processing...</p>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  onClick={() => setSelectedImage(null)}
                  className="w-full mt-6"
                >
                  Upload Different Image
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
