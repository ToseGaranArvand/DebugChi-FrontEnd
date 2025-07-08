"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from 'lucide-react'

interface FeedbackFormProps {
  onSubmit: (rating: number, comment: string) => void
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [hoveredStar, setHoveredStar] = React.useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(rating, comment)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">امتیاز شما</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoveredStar || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">نظر شما</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="نظر خود را بنویسید..."
          className="min-h-[100px]"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={!rating || !comment.trim()}
      >
        ثبت نظر
      </Button>
    </form>
  )
}

