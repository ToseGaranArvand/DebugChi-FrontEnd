import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileUploadProps {
  onUpload: (file: File) => void
  onClose: () => void
}

export default function FileUpload({ onUpload, onClose }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>آپلود فایل</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            لغو
          </Button>
          <Button onClick={handleUpload} disabled={!file}>
            آپلود
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

