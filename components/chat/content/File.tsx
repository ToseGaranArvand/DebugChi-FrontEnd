"use client"

import { useState } from "react"
import { Download, FileDown, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface FileDownloaderProps {
  fileUrl: string
  fileName?: string
  buttonText?: string
}

export function FileDownloader({
  fileUrl,
  fileName = "downloaded-file",
  buttonText = "دانلود فایل",
}: FileDownloaderProps) {
  const [downloadProgress, setDownloadProgress] = useState<number>(0)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      setDownloadProgress(0)
      setError(null)

      // Fetch the file
      const response = await fetch(fileUrl)

      if (!response.ok) {
        throw new Error(`خطا در دانلود: ${response.status} ${response.statusText}`)
      }

      // Get the total file size
      const contentLength = response.headers.get("Content-Length")
      const totalBytes = contentLength ? Number.parseInt(contentLength, 10) : 0

      // Get the file type from the response
      const contentType = response.headers.get("Content-Type") || ""

      // Create a reader from the response body
      const reader = response.body?.getReader()

      if (!reader) {
        throw new Error("خطا در خواندن فایل")
      }

      // Read the data chunks
      let receivedBytes = 0
      const chunks: Uint8Array[] = []

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        chunks.push(value)
        receivedBytes += value.length

        // Calculate progress
        if (totalBytes > 0) {
          const progress = Math.min(Math.round((receivedBytes / totalBytes) * 100), 100)
          setDownloadProgress(progress)
        }
      }

      // Combine all chunks into a single Uint8Array
      const allChunks = new Uint8Array(receivedBytes)
      let position = 0

      for (const chunk of chunks) {
        allChunks.set(chunk, position)
        position += chunk.length
      }

      // Convert to blob
      const blob = new Blob([allChunks], { type: contentType })

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setIsComplete(true)
      setIsDownloading(false)

      // Reset complete status after 3 seconds
      setTimeout(() => {
        setIsComplete(false)
        setDownloadProgress(0)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در دانلود فایل")
      setIsDownloading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-none bg-purple-950/50 mb-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{fileName}</span>
          <FileDown className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isDownloading && (
          <div className="space-y-2">
            <Progress value={downloadProgress} className="h-2 w-full" />
            <p className="text-sm text-center text-muted-foreground font-lightSans">{downloadProgress}% دانلود شده</p>
          </div>
        )}

        {/* {error && <p className="text-sm text-destructive text-center">{error}</p>} */}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full"
          variant={isComplete ? "outline" : "default"}
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              دانلود تکمیل شد
            </>
          ) : isDownloading ? (
            <>
              <span className="mr-2">در حال دانلود...</span>
              <span>{downloadProgress}%</span>
            </>
          ) : (
            <>
              <Download className="ml-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

