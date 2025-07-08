"use client";

import { tenderContext } from "@/context/UploadTenderContext";
import { Upload, X } from "lucide-react";
import type React from "react";

import { useState, useRef, useCallback, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the type for our draggable items
type ImageItem = {
  id: string;
  file: File;
  preview: string;
};

// Define the type for the drag item
const ItemTypes = {
  IMAGE: "image",
};

// DraggableImage component
const DraggableImage = ({
  image,
  index,
  moveImage,
  removeImage,
}: {
  image: ImageItem;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  removeImage: (id: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Set up the drop functionality
  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Move the item
      moveImage(dragIndex, hoverIndex);

      // Update the item's index for future interactions
      item.index = hoverIndex;
    },
  });

  // Set up the drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: () => {
      return { id: image.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Connect the drag and drop refs
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`relative flex-shrink-0 w-[120px] h-[120px] rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        boxShadow: isDragging ? "0 8px 20px rgba(0,0,0,0.15)" : "none",
      }}
    >
      <img
        src={image.preview || "/placeholder.svg"}
        alt="Preview"
        className="w-full h-full object-cover"
      />

      {/* Remove Button */}
      <button
        onClick={() => removeImage(image.id)}
        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Drag Handle Indicator */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-1 flex justify-center items-center">
        <div className="w-10 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default function ImageUploader() {
  
  const [image, setImage] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
const {setProjectData ,project,setImages} = tenderContext()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

      setImage((prev) => [...prev, ...newImages]);
      setImages(image)
    }
  };

  useEffect(() => {
    setImages(image);
  }, [image]);
  const removeImage = (id: string) => {
    setImage((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      return filtered;
    });
  };

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setImage((prevImages) => {
      const newImages = [...prevImages];
      const draggedItem = newImages[dragIndex];
      newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedItem);
      return newImages;
    });
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-black rounded-xl shadow-md">
        {/* Simple Instructions */}

        {/* Image Preview Area with Horizontal Scroll */}
        {image.length > 0 && (
          <div className="mb-4 overflow-hidden">
            <div className="flex overflow-x-auto pb-2 gap-3 min-h-[60px]">
              {image.map((img, index) => (
                <DraggableImage
                  key={img.id}
                  image={img}
                  index={index}
                  moveImage={moveImage}
                  removeImage={removeImage}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upload Box */}
        <div
          className="border-2 border-dashed h-20 border-gray-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            multiple
          />
            <Upload className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </DndProvider>
  );
}
