"use client"

import { cn } from "@/lib/utils"
import React, { useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, GripVertical, ImageIcon } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@heroui/react"

type FileWithPreview = File & {
  id: string
  preview?: string
}

interface FileUploadProps {
  onChange?: (files: File[]) => void
  maxFiles?: number
  accept?: Record<string, string[]>
}

const SortableFileItem = ({
  file,
  onRemove,
}: {
  file: FileWithPreview
  onRemove: (id: string) => void
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: file.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isImage = file.type.startsWith("image/")

  return (  
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white dark:bg-neutral-900 flex items-start gap-3 p-4 rounded-md shadow-sm mb-3 group max-h-48"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none flex items-center self-stretch text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      {isImage ? (
        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
          <img src={file.preview || "/placeholder.svg"} alt={file.name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="h-16 w-16 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
          <ImageIcon className="h-8 w-8 text-neutral-400" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate">{file.name}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
            {file.type}
          </span>
          <span className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
          Modified {new Date(file.lastModified).toLocaleDateString()}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onPress={() => onRemove(file.id)}
        startContent={<X className="h-4 w-4" />}
      >
      </Button>
    </div>
  )
}

export const FileUpload = ({
  onChange,
  maxFiles = 10,
  accept = {
    "image/*": [],
    "application/pdf": [],
  },
}: FileUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleFileChange = (newFiles: File[]) => {
    if (files.length + newFiles.length > maxFiles) {
      // Optionally show a toast or alert here
      console.warn(`You can only upload up to ${maxFiles} files`)
      return
    }

    const filesWithPreview = newFiles.map((file) => {
      const fileWithId = Object.assign(file, {
        id: `${file.name}-${Date.now()}`,
      }) as FileWithPreview

      // Create preview URL for images
      if (file.type.startsWith("image/")) {
        fileWithId.preview = URL.createObjectURL(file)
      }

      return fileWithId
    })

    const updatedFiles = [...files, ...filesWithPreview]
    setFiles(updatedFiles)
    onChange?.(updatedFiles)
  }

  const handleRemoveFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id)
    setFiles(updatedFiles)
    onChange?.(updatedFiles)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((file) => file.id === active.id)
      const newIndex = files.findIndex((file) => file.id === over.id)

      const newFiles = [...files]
      const [movedFile] = newFiles.splice(oldIndex, 1)
      newFiles.splice(newIndex, 0, movedFile)

      setFiles(newFiles)
      onChange?.(newFiles)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    accept,
    noClick: true,
  })

  // Clean up preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [])

  return (
    <div className="w-full ">
      <div
        {...getRootProps()}
        className={cn(
          "w-full rounded-lg border-2 border-dashed transition-colors relative pb-16",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-neutral-200 dark:border-neutral-800 hover:border-primary/50",
        )}
      >
        <div onClick={handleClick} className="flex flex-col items-center justify-center p-6 text-center">
          <input
            {...getInputProps()}
            ref={fileInputRef}
            id="file-upload-input"
            type="file"
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
            multiple
          />

          {/* <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div> */}

          <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
            {isDragActive ? "بکشید و رها کنید" : "آپلود عکس"}
          </h3>

         

    
            <Button
              variant="light"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
            >
            انتخاب عکس
            </Button>
          </div>
     

      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            آپلود عکس ({files.length})
          </h4>

          <div className="max-h-[300px] overflow-y-auto pr-2">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={files.map((file) => file.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {files.map((file) => (
                    <SortableFileItem key={file.id} file={file} onRemove={handleRemoveFile} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
