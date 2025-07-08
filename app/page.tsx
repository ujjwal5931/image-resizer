'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ResizeResult {
  success: boolean
  imageUrl?: string
  error?: string
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [width, setWidth] = useState<number>(800)
  const [height, setHeight] = useState<number>(600)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [result, setResult] = useState<ResizeResult | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, PNG, or WebP)')
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }

      setSelectedFile(file)
      setResult(null)
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!selectedFile) {
      alert('Please select an image file')
      return
    }

    if (width <= 0 || height <= 0) {
      alert('Width and height must be greater than 0')
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('width', width.toString())
      formData.append('height', height.toString())

      const response = await fetch('/api/resize', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      
      setResult({
        success: true,
        imageUrl: imageUrl
      })
    } catch (error) {
      console.error('Error resizing image:', error)
      setResult({
        success: false,
        error: 'Failed to resize image. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle download
  const handleDownload = () => {
    if (result?.imageUrl) {
      const link = document.createElement('a')
      link.href = result.imageUrl
      link.download = `resized_${selectedFile?.name || 'image'}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Clear form
  const handleClear = () => {
    setSelectedFile(null)
    setResult(null)
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Image Resizer
          </h1>
          <p className="text-lg text-gray-600">
            Resize your images to any size with high quality
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG, WebP (MAX. 10MB)</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!selectedFile || isLoading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Resize Image'
                )}
              </button>
              {selectedFile && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Preview Section */}
        {previewUrl && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Original Image</h2>
            <div className="flex justify-center">
              <div className="relative max-w-md">
                <Image
                  src={previewUrl}
                  alt="Original image preview"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resized Image</h2>
            
            {result.success && result.imageUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative max-w-md">
                    <Image
                      src={result.imageUrl}
                      alt="Resized image"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    Download Resized Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-red-600 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <p className="text-lg font-medium">{result.error}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 