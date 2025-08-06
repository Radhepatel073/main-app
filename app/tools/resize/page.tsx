"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Upload, Download, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ResizePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [newDimensions, setNewDimensions] = useState({ width: 0, height: 0 })
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [format, setFormat] = useState("jpeg")
  const [quality, setQuality] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setDimensions({ width: img.width, height: img.height })
          setNewDimensions({ width: img.width, height: img.height })
          setSelectedImage(e.target?.result as string)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDimensionChange = useCallback((dimension: 'width' | 'height', value: number) => {
    if (maintainAspectRatio && dimensions.width && dimensions.height) {
      const aspectRatio = dimensions.width / dimensions.height
      if (dimension === 'width') {
        setNewDimensions({ width: value, height: Math.round(value / aspectRatio) })
      } else {
        setNewDimensions({ width: Math.round(value * aspectRatio), height: value })
      }
    } else {
      setNewDimensions(prev => ({ ...prev, [dimension]: value }))
    }
  }, [maintainAspectRatio, dimensions])

  const processImage = useCallback(async () => {
    if (!selectedImage || !canvasRef.current) return

    setIsProcessing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = newDimensions.width
      canvas.height = newDimensions.height

      if (!ctx) return

      ctx.drawImage(img, 0, 0, newDimensions.width, newDimensions.height)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `resized-${Date.now()}.${format}`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
        setIsProcessing(false)
      }, `image/${format}`, quality / 100)
    }
    
    img.src = selectedImage
  }, [selectedImage, newDimensions, format, quality])

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
            Resize Image
          </h1>
          <p className="text-gray-600">Change your image dimensions while maintaining quality</p>
        </div>

        {!selectedImage ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Upload Image to Resize</h3>
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
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                  <img src={selectedImage || "/placeholder.svg"} alt="Preview" className="max-w-full max-h-[400px] object-contain" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resize Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={newDimensions.width}
                      onChange={(e) => handleDimensionChange('width', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={newDimensions.height}
                      onChange={(e) => handleDimensionChange('height', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aspectRatio"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="aspectRatio">Maintain aspect ratio</Label>
                </div>

                <div>
                  <Label>Output Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quality">Quality: {quality}%</Label>
                  <input
                    id="quality"
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>

                <div className="text-sm text-gray-600">
                  <p>Original: {dimensions.width} × {dimensions.height}</p>
                  <p>New: {newDimensions.width} × {newDimensions.height}</p>
                </div>

                <Button 
                  onClick={processImage} 
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  {isProcessing ? "Processing..." : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Resized Image
                    </>
                  )}
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => setSelectedImage(null)}
                  className="w-full"
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
