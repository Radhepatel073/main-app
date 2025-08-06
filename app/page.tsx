"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Upload, Download, RotateCw, Crop, Palette, Sliders, Menu, Globe, RotateCcw, FlipHorizontal, FlipVertical, Scissors, Eraser } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import Head from "next/head"

interface ImageState {
  rotation: number
  flipHorizontal: boolean
  flipVertical: boolean
  brightness: number
  contrast: number
  saturation: number
  hue: number
  blur: number
}

export default function PhotoResize() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [newDimensions, setNewDimensions] = useState({ width: 0, height: 0 })
  const [quality, setQuality] = useState([90])
  const [format, setFormat] = useState("jpeg")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("resize")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const [imageState, setImageState] = useState<ImageState>({
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0
  })

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setDimensions({ width: img.width, height: img.height })
          setNewDimensions({ width: img.width, height: img.height })
          setSelectedImage(e.target?.result as string)
          setImageState({
            rotation: 0,
            flipHorizontal: false,
            flipVertical: false,
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0
          })
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setDimensions({ width: img.width, height: img.height })
          setNewDimensions({ width: img.width, height: img.height })
          setSelectedImage(e.target?.result as string)
          setImageState({
            rotation: 0,
            flipHorizontal: false,
            flipVertical: false,
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0
          })
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }, [])

  const updatePreview = useCallback(() => {
    if (!selectedImage || !previewCanvasRef.current) return

    const canvas = previewCanvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate canvas size based on rotation
      const isRotated = imageState.rotation % 180 !== 0
      canvas.width = isRotated ? img.height : img.width
      canvas.height = isRotated ? img.width : img.height

      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Save context
      ctx.save()

      // Move to center
      ctx.translate(canvas.width / 2, canvas.height / 2)

      // Apply transformations
      ctx.rotate((imageState.rotation * Math.PI) / 180)
      ctx.scale(
        imageState.flipHorizontal ? -1 : 1,
        imageState.flipVertical ? -1 : 1
      )

      // Apply filters
      ctx.filter = `
        brightness(${imageState.brightness}%)
        contrast(${imageState.contrast}%)
        saturate(${imageState.saturation}%)
        hue-rotate(${imageState.hue}deg)
        blur(${imageState.blur}px)
      `

      // Draw image
      ctx.drawImage(img, -img.width / 2, -img.height / 2)

      // Restore context
      ctx.restore()
    }

    img.src = selectedImage
  }, [selectedImage, imageState])

  useEffect(() => {
    updatePreview()
  }, [updatePreview])

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

  const rotateImage = useCallback((degrees: number) => {
    setImageState(prev => ({ ...prev, rotation: (prev.rotation + degrees) % 360 }))
  }, [])

  const flipImage = useCallback((direction: 'horizontal' | 'vertical') => {
    setImageState(prev => ({
      ...prev,
      [direction === 'horizontal' ? 'flipHorizontal' : 'flipVertical']: !prev[direction === 'horizontal' ? 'flipHorizontal' : 'flipVertical']
    }))
  }, [])

  const resetImage = useCallback(() => {
    setImageState({
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      blur: 0
    })
    setNewDimensions({ width: dimensions.width, height: dimensions.height })
  }, [dimensions])

  const processImage = useCallback(async () => {
    if (!selectedImage || !canvasRef.current) return

    setIsProcessing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Set canvas size to new dimensions
      canvas.width = newDimensions.width
      canvas.height = newDimensions.height

      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Save context
      ctx.save()

      // Move to center
      ctx.translate(canvas.width / 2, canvas.height / 2)

      // Apply transformations
      ctx.rotate((imageState.rotation * Math.PI) / 180)
      ctx.scale(
        imageState.flipHorizontal ? -1 : 1,
        imageState.flipVertical ? -1 : 1
      )

      // Apply filters
      ctx.filter = `
        brightness(${imageState.brightness}%)
        contrast(${imageState.contrast}%)
        saturate(${imageState.saturation}%)
        hue-rotate(${imageState.hue}deg)
        blur(${imageState.blur}px)
      `

      // Calculate scaling to fit new dimensions
      const scaleX = newDimensions.width / img.width
      const scaleY = newDimensions.height / img.height
      const scale = Math.min(scaleX, scaleY)

      const scaledWidth = img.width * scale
      const scaledHeight = img.height * scale

      // Draw image
      ctx.drawImage(img, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight)

      // Restore context
      ctx.restore()
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `photoresize-${Date.now()}.${format}`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
        setIsProcessing(false)
      }, `image/${format}`, quality[0] / 100)
    }
    
    img.src = selectedImage
  }, [selectedImage, newDimensions, format, quality, imageState])

  const loadSampleImage = useCallback(() => {
    const sampleImageUrl = "/rolling-hills.png"
    setSelectedImage(sampleImageUrl)
    setDimensions({ width: 600, height: 400 })
    setNewDimensions({ width: 600, height: 400 })
    setImageState({
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      blur: 0
    })
  }, [])

  const Navigation = () => (
    <nav className="flex items-center justify-between p-4 lg:p-6">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
          <Crop className="w-4 h-4 text-white" />
        </div>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-300">
          <Palette className="w-4 h-4 text-white" />
        </div>
      </Link>
      
      <div className="hidden lg:flex items-center space-x-8">
        <div className="relative group">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">Tools</button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              <Link href="/tools/resize" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Resize Image</Link>
              <Link href="/tools/crop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Crop Image</Link>
              <Link href="/tools/rotate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rotate Image</Link>
              <Link href="/tools/convert" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Convert Format</Link>
              <Link href="/tools/remove-bg" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Remove Background</Link>
            </div>
          </div>
        </div>
        <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
        <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
        <div className="relative group">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">Support</button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              <Link href="/support/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</Link>
              <Link href="/support/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact Us</Link>
              <Link href="/support/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">FAQ</Link>
              <Link href="/support/privacy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">About</button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                About PhotoResize
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-gray-600">
              <p>
                PhotoResize is a powerful, free online image editor that allows you to resize, rotate, 
                crop, and apply filters to your images without any software installation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Resize images to any dimension</li>
                    <li>• Crop images with precision</li>
                    <li>• Rotate and flip images</li>
                    <li>• Remove backgrounds automatically</li>
                    <li>• Apply color filters and adjustments</li>
                    <li>• Convert between formats</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Privacy:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• All processing in your browser</li>
                    <li>• No images uploaded to servers</li>
                    <li>• Complete privacy and security</li>
                    <li>• No registration required</li>
                    <li>• Free to use forever</li>
                  </ul>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="hidden lg:flex">
          <Globe className="w-4 h-4 mr-2" />
          EN
        </Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <div className="space-y-2">
                <h3 className="font-semibold">Tools</h3>
                <Link href="/tools/resize" className="block text-gray-600 hover:text-gray-900 pl-4">Resize Image</Link>
                <Link href="/tools/crop" className="block text-gray-600 hover:text-gray-900 pl-4">Crop Image</Link>
                <Link href="/tools/rotate" className="block text-gray-600 hover:text-gray-900 pl-4">Rotate Image</Link>
                <Link href="/tools/convert" className="block text-gray-600 hover:text-gray-900 pl-4">Convert Format</Link>
                <Link href="/tools/remove-bg" className="block text-gray-600 hover:text-gray-900 pl-4">Remove Background</Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Support</h3>
                <Link href="/support/help" className="block text-gray-600 hover:text-gray-900 pl-4">Help Center</Link>
                <Link href="/support/contact" className="block text-gray-600 hover:text-gray-900 pl-4">Contact Us</Link>
                <Link href="/support/faq" className="block text-gray-600 hover:text-gray-900 pl-4">FAQ</Link>
                <Link href="/support/privacy" className="block text-gray-600 hover:text-gray-900 pl-4">Privacy Policy</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )

  return (
    <>
      <Head>
        <title>PhotoResize - Free Online Image Editor | Resize, Crop, Edit Photos</title>
        <meta name="description" content="Free online photo editor to resize images, crop photos, remove backgrounds, convert JPG to PNG, edit pictures. No download required. Support JPG, PNG, GIF, WebP, BMP formats." />
        <meta name="keywords" content="photo resize, image resize, resize photo online, crop image, photo editor, image editor, resize jpg, resize png, convert jpg to png, png to jpg, remove background, background remover, photo crop, image crop, online photo editor, free image editor, picture resize, photo resizer, image resizer, compress image, reduce image size, photo filter, image filter, rotate image, flip image, brightness contrast, saturation hue, blur image, sharpen image, photo effects, image effects, webp converter, gif editor, bmp converter, photo editing tools, image editing software, online image tools, free photo tools, picture editor, image optimizer, photo compressor" />
        <link rel="canonical" href="https://photoresize.com" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 lg:py-16">
          {!selectedImage ? (
            <div className="text-center max-w-4xl mx-auto">
              {/* SEO Optimized Header */}
              <header className="mb-8 flex justify-center">
                <div className="relative">
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                    Photo<span className="text-green-500">Resize</span>
                  </h1>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                </div>
              </header>
              
              <h2 className="text-xl lg:text-2xl text-gray-600 mb-4">
                Free Online Image Editor & Photo Resizer
              </h2>
              
              <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                Resize photos, crop images, remove backgrounds, and convert between JPG, PNG, GIF, WebP, BMP formats. 
                Professional photo editing tools - completely free, no download required, works in your browser.
              </p>

              {/* SEO Keywords Section */}
              <div className="mb-8 text-sm text-gray-500">
                <p>
                  <strong>Supported formats:</strong> JPG, JPEG, PNG, GIF, WebP, BMP | 
                  <strong> Tools:</strong> Resize, Crop, Rotate, Flip, Remove Background, Convert, Compress, Filter
                </p>
              </div>

              {/* 3D Upload Area */}
              <section 
                className={`relative group cursor-pointer transition-all duration-300 ${isDragging ? 'scale-105' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload image area - drag and drop or click to select image files"
              >
                <div className={`bg-white rounded-2xl shadow-2xl border-2 border-dashed p-12 lg:p-20 transition-all duration-300 transform hover:scale-105 hover:shadow-3xl ${
                  isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg">
                      <Upload className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                      UPLOAD IMAGE TO RESIZE
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      Drag and drop your JPG, PNG, GIF, WebP, or BMP image here or click to browse
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                      <Badge variant="secondary">JPG</Badge>
                      <Badge variant="secondary">PNG</Badge>
                      <Badge variant="secondary">GIF</Badge>
                      <Badge variant="secondary">WEBP</Badge>
                      <Badge variant="secondary">BMP</Badge>
                    </div>
                  </div>
                </div>
              </section>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                aria-label="File input for image upload"
              />

              <div className="mt-8">
                <button
                  onClick={loadSampleImage}
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  aria-label="Load sample image to try photo editing features"
                >
                  New to photo editing? Try our sample image.
                </button>
              </div>

              {/* SEO Optimized Features Grid */}
              <section id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-16">
                <h2 className="sr-only">Photo Editing Tools and Features</h2>
                {[
                  { 
                    icon: Crop, 
                    title: "Resize Images", 
                    desc: "Change photo dimensions and compress file size", 
                    href: "/tools/resize",
                    keywords: "resize image, photo resizer, change image size"
                  },
                  { 
                    icon: Scissors, 
                    title: "Crop Photos", 
                    desc: "Crop images with precision and preset ratios", 
                    href: "/tools/crop",
                    keywords: "crop image, photo crop, cut image"
                  },
                  { 
                    icon: RotateCw, 
                    title: "Rotate & Flip", 
                    desc: "Rotate and flip images in any direction", 
                    href: "/tools/rotate",
                    keywords: "rotate image, flip photo, turn image"
                  },
                  { 
                    icon: Palette, 
                    title: "Photo Filters", 
                    desc: "Apply brightness, contrast, saturation filters", 
                    href: "#",
                    keywords: "photo filter, image effects, brightness contrast"
                  },
                  { 
                    icon: Eraser, 
                    title: "Remove Background", 
                    desc: "Automatically remove image backgrounds", 
                    href: "/tools/remove-bg",
                    keywords: "remove background, background remover, transparent background"
                  }
                ].map((feature, index) => (
                  <Link key={index} href={feature.href} aria-label={`${feature.title} - ${feature.desc}`}>
                    <article className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.desc}</p>
                          <span className="sr-only">{feature.keywords}</span>
                        </CardContent>
                      </Card>
                    </article>
                  </Link>
                ))}
              </section>

              {/* SEO Content Section */}
              <section className="mt-16 text-left max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Professional Photo Editing Made Simple
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Resize Images Online</h3>
                    <p className="mb-4">
                      Easily resize your photos to any dimension while maintaining quality. Perfect for social media, 
                      websites, or printing. Supports batch processing and maintains aspect ratios automatically.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Convert Image Formats</h3>
                    <p>
                      Convert between JPG, PNG, GIF, WebP, and BMP formats instantly. Optimize file sizes 
                      for web use or convert to PNG for transparency support.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Remove Backgrounds</h3>
                    <p className="mb-4">
                      Advanced AI-powered background removal tool that automatically detects subjects 
                      and creates transparent backgrounds. Perfect for product photos and portraits.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Photo Filters & Effects</h3>
                    <p>
                      Apply professional filters including brightness, contrast, saturation, hue rotation, 
                      and blur effects. Fine-tune your images with precision controls.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Image Preview */}
                <div className="xl:col-span-2">
                  <Card className="overflow-hidden shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative bg-gray-100 min-h-[400px] flex items-center justify-center">
                        <canvas
                          ref={previewCanvasRef}
                          className="max-w-full max-h-[600px] object-contain"
                          aria-label="Image preview canvas showing edited photo"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                  <Card className="shadow-xl">
                    <CardContent className="p-6">
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="resize">Resize</TabsTrigger>
                          <TabsTrigger value="rotate">Rotate</TabsTrigger>
                          <TabsTrigger value="filters">Filters</TabsTrigger>
                          <TabsTrigger value="adjust">Adjust</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="resize" className="space-y-4 mt-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="width">Width (px)</Label>
                              <Input
                                id="width"
                                type="number"
                                value={newDimensions.width}
                                onChange={(e) => handleDimensionChange('width', parseInt(e.target.value) || 0)}
                                aria-label="Image width in pixels"
                              />
                            </div>
                            <div>
                              <Label htmlFor="height">Height (px)</Label>
                              <Input
                                id="height"
                                type="number"
                                value={newDimensions.height}
                                onChange={(e) => handleDimensionChange('height', parseInt(e.target.value) || 0)}
                                aria-label="Image height in pixels"
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
                              aria-label="Maintain aspect ratio when resizing"
                            />
                            <Label htmlFor="aspectRatio" className="text-sm">Maintain aspect ratio</Label>
                          </div>
                          <p className="text-sm text-gray-600">
                            Original: {dimensions.width} × {dimensions.height} pixels
                          </p>
                        </TabsContent>
                        
                        <TabsContent value="rotate" className="space-y-4 mt-6">
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              onClick={() => rotateImage(90)}
                              className="flex items-center justify-center"
                              aria-label="Rotate image 90 degrees clockwise"
                            >
                              <RotateCw className="w-4 h-4 mr-2" />
                              90°
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => rotateImage(-90)}
                              className="flex items-center justify-center"
                              aria-label="Rotate image 90 degrees counter-clockwise"
                            >
                              <RotateCcw className="w-4 h-4 mr-2" />
                              -90°
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => flipImage('horizontal')}
                              className="flex items-center justify-center"
                              aria-label="Flip image horizontally"
                            >
                              <FlipHorizontal className="w-4 h-4 mr-2" />
                              Flip H
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => flipImage('vertical')}
                              className="flex items-center justify-center"
                              aria-label="Flip image vertically"
                            >
                              <FlipVertical className="w-4 h-4 mr-2" />
                              Flip V
                            </Button>
                          </div>
                          <div>
                            <Label>Custom Rotation: {imageState.rotation}°</Label>
                            <Slider
                              value={[imageState.rotation]}
                              onValueChange={([value]) => setImageState(prev => ({ ...prev, rotation: value }))}
                              max={360}
                              min={0}
                              step={1}
                              className="mt-2"
                              aria-label="Custom rotation angle slider"
                            />
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="filters" className="space-y-4 mt-6">
                          <div>
                            <Label>Brightness: {imageState.brightness}%</Label>
                            <Slider
                              value={[imageState.brightness]}
                              onValueChange={([value]) => setImageState(prev => ({ ...prev, brightness: value }))}
                              max={200}
                              min={0}
                              step={1}
                              className="mt-2"
                              aria-label="Brightness adjustment slider"
                            />
                          </div>
                          <div>
                            <Label>Contrast: {imageState.contrast}%</Label>
                            <Slider
                              value={[imageState.contrast]}
                              onValueChange={([value]) => setImageState(prev => ({ ...prev, contrast: value }))}
                              max={200}
                              min={0}
                              step={1}
                              className="mt-2"
                              aria-label="Contrast adjustment slider"
                            />
                          </div>
                          <div>
                            <Label>Saturation: {imageState.saturation}%</Label>
                            <Slider
                              value={[imageState.saturation]}
                              onValueChange={([value]) => setImageState(prev => ({ ...prev, saturation: value }))}
                              max={200}
                              min={0}
                              step={1}
                              className="mt-2"
                              aria-label="Saturation adjustment slider"
                            />
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="adjust" className="space-y-4 mt-6">
                          <div>
                            <Label>Hue: {imageState.hue}°</Label>
                            <Slider
                              value={[imageState.hue]}
                              onValueChange={([value]) => setImageState(prev => ({ ...prev, hue: value }))}
                              max={360}
                              min={0}
                              step={1}
                              className="mt-2"
                              aria-label="Hue rotation slider"
                            />
                          </div>
                          <div>
                            <Label>Blur: {imageState.blur}px</Label>
                            <Slider
                              value={[imageState.blur]}
                              onValueChange={([value]) => setImageState(prev => ({ ...prev, blur: value }))}
                              max={10}
                              min={0}
                              step={0.1}
                              className="mt-2"
                              aria-label="Blur effect slider"
                            />
                          </div>
                          <div>
                            <Label>Quality: {quality[0]}%</Label>
                            <Slider
                              value={quality}
                              onValueChange={setQuality}
                              max={100}
                              min={1}
                              step={1}
                              className="mt-2"
                              aria-label="Image quality slider"
                            />
                          </div>
                          <div>
                            <Label>Output Format</Label>
                            <Select value={format} onValueChange={setFormat}>
                              <SelectTrigger aria-label="Select output image format">
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="jpeg">JPEG</SelectItem>
                                <SelectItem value="png">PNG</SelectItem>
                                <SelectItem value="webp">WebP</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col gap-4">
                    <Button 
                      onClick={processImage} 
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      aria-label="Download processed image"
                    >
                      {isProcessing ? (
                        "Processing Image..."
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Download Processed Image
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={resetImage}
                      className="w-full"
                      aria-label="Reset all image changes"
                    >
                      Reset All Changes
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedImage(null)
                        setImageFile(null)
                      }}
                      className="w-full"
                      aria-label="Upload new image"
                    >
                      Upload New Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
        
        {/* SEO Optimized Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  PhotoResize
                </h3>
                <p className="text-gray-400 mb-4">
                  Free online image editor for all your photo editing needs. Resize, crop, convert, and enhance images instantly.
                </p>
                <p className="text-sm text-gray-500">
                  Professional photo editing tools - completely free, no registration required.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Image Tools</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/tools/resize" className="hover:text-white transition-colors">Resize Image Online</Link></li>
                  <li><Link href="/tools/crop" className="hover:text-white transition-colors">Crop Photo Tool</Link></li>
                  <li><Link href="/tools/rotate" className="hover:text-white transition-colors">Rotate & Flip Images</Link></li>
                  <li><Link href="/tools/convert" className="hover:text-white transition-colors">Convert Image Format</Link></li>
                  <li><Link href="/tools/remove-bg" className="hover:text-white transition-colors">Remove Background</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support & Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/support/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/support/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                  <li><Link href="/support/faq" className="hover:text-white transition-colors">FAQ - Common Questions</Link></li>
                  <li><Link href="/support/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company Info</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/company/about" className="hover:text-white transition-colors">About PhotoResize</Link></li>
                  <li><Link href="/company/blog" className="hover:text-white transition-colors">Photo Editing Blog</Link></li>
                  <li><Link href="/company/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/company/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 PhotoResize. All rights reserved. Free online image editor and photo resizer.</p>
              <p className="text-sm mt-2">
                Keywords: resize image, crop photo, remove background, convert JPG PNG, online photo editor, image resizer, picture editor
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
