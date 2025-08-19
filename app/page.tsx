"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download, QrCode, Palette, Settings } from "lucide-react"

export default function QRGenerator() {
  const [text, setText] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [size, setSize] = useState([200])
  const [margin, setMargin] = useState([1])
  const [errorCorrection, setErrorCorrection] = useState("M")
  const [dotStyle, setDotStyle] = useState("square")
  const [cornerSquareStyle, setCornerSquareStyle] = useState("square")
  const [cornerDotStyle, setCornerDotStyle] = useState("square")
  const [selectedTemplate, setSelectedTemplate] = useState("basic")

  const templates = [
    { id: "basic", name: "Basic", icon: "⬜" },
    { id: "rounded", name: "Rounded", icon: "🔘" },
    { id: "shadow", name: "Shadow", icon: "🔳" },
    { id: "gradient", name: "Gradient", icon: "🌈" },
    { id: "frame", name: "Frame", icon: "🖼️" },
    { id: "dots", name: "Dots", icon: "⚫" },
    { id: "scan-me", name: "Scan Me", icon: "📱" },
    { id: "polaroid", name: "Polaroid", icon: "📷" },
  ]

  const generateQRCode = () => {
    if (!text.trim()) return

    const params = new URLSearchParams({
      data: text,
      size: size[0].toString(),
      bgcolor: backgroundColor.replace("#", ""),
      color: foregroundColor.replace("#", ""),
      qzone: margin[0].toString(),
      ecc: errorCorrection,
    })

    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`)
  }

  useEffect(() => {
    if (text.trim()) {
      generateQRCode()
    }
  }, [text, foregroundColor, backgroundColor, size, margin, errorCorrection])

  const downloadQR = (format: "png" | "svg") => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `qr-code.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const applyTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)

    switch (templateId) {
      case "rounded":
        setDotStyle("rounded")
        setCornerSquareStyle("rounded")
        setCornerDotStyle("rounded")
        break
      case "shadow":
        setForegroundColor("#1a1a1a")
        setBackgroundColor("#f5f5f5")
        break
      case "gradient":
        setForegroundColor("#6366f1")
        setBackgroundColor("#ffffff")
        break
      case "frame":
        setMargin([2])
        setForegroundColor("#000000")
        setBackgroundColor("#ffffff")
        break
      case "dots":
        setDotStyle("dots")
        setForegroundColor("#3b82f6")
        break
      default:
        setDotStyle("square")
        setCornerSquareStyle("square")
        setCornerDotStyle("square")
        setForegroundColor("#000000")
        setBackgroundColor("#ffffff")
        setMargin([1])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Ultimate QR Generator</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* QR Code Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  QR Code Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="content">Enter text or URL</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter the content for your QR code..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>
                <Button
                  onClick={generateQRCode}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!text.trim()}
                >
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            {/* Customization Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Customization Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Foreground Color</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-8 h-8 rounded border border-gray-300"
                        style={{ backgroundColor: foregroundColor }}
                      />
                      <Input
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-16 h-8 p-0 border-0"
                      />
                      <Input
                        type="text"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Background Color</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-8 h-8 rounded border border-gray-300"
                        style={{ backgroundColor: backgroundColor }}
                      />
                      <Input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-16 h-8 p-0 border-0"
                      />
                      <Input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Size and Margin */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>QR Code Size</Label>
                    <div className="mt-2">
                      <Slider value={size} onValueChange={setSize} max={400} min={100} step={10} className="w-full" />
                      <div className="text-sm text-gray-500 mt-1">{size[0]}px</div>
                    </div>
                  </div>
                  <div>
                    <Label>Margin/Padding</Label>
                    <div className="mt-2">
                      <Slider value={margin} onValueChange={setMargin} max={5} min={0} step={1} className="w-full" />
                      <div className="text-sm text-gray-500 mt-1">{margin[0]}</div>
                    </div>
                  </div>
                </div>

                {/* Error Correction and Styles */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Error Correction</Label>
                    <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Low (7%)</SelectItem>
                        <SelectItem value="M">Medium (15%)</SelectItem>
                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                        <SelectItem value="H">High (30%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Dot Style</Label>
                    <Select value={dotStyle} onValueChange={setDotStyle}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="dots">Dots</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Corner Square Style</Label>
                    <Select value={cornerSquareStyle} onValueChange={setCornerSquareStyle}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Corner Dot Style</Label>
                    <Select value={cornerDotStyle} onValueChange={setCornerDotStyle}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview and Templates */}
          <div className="space-y-6">
            {/* QR Code Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  QR Code Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-white p-8 rounded-lg shadow-sm border">
                    {qrCodeUrl ? (
                      <img
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="Generated QR Code"
                        className="max-w-full h-auto"
                        style={{ width: size[0], height: size[0] }}
                      />
                    ) : (
                      <div
                        className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
                        style={{ width: size[0], height: size[0] }}
                      >
                        <span className="text-gray-500">Enter text to generate QR code</span>
                      </div>
                    )}
                  </div>

                  {qrCodeUrl && (
                    <div className="flex gap-2">
                      <Button onClick={() => downloadQR("png")} className="bg-green-600 hover:bg-green-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download PNG
                      </Button>
                      <Button onClick={() => downloadQR("svg")} className="bg-cyan-600 hover:bg-cyan-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download SVG
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Design Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Design Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-2">{template.icon}</div>
                      <div className="text-sm font-medium">{template.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
