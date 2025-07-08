"use client"

import type React from "react"

import type { Main } from "@/redux/slices/courseList"
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure,Input, Divider } from "@heroui/react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Heart } from "lucide-react"

export default function VideoPlayer({ data }: { data: Main }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const [userComment, setUserComment] = useState("")
  const [localComments, setLocalComments] = useState<any[]>([...(data.comments || [])])
  const [localLikes, setLocalLikes] = useState(data.likes_count)
  const [hasLiked, setHasLiked] = useState(false)

  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [localLikesCount, setLocalLikesCount] = useState(0)

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)

      // Update progress bar
      if (progressRef.current && duration > 0) {
        const percentage = (videoRef.current.currentTime / duration) * 100
        progressRef.current.style.width = `${percentage}%`
      }
    }
  }

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / progressBar.offsetWidth
      videoRef.current.currentTime = pos * duration
    }
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 1
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Reset player when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [isOpen])

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Initialize local comments and likes
  useEffect(() => {
    if (data) {
      setLocalComments(data.comments || [])
      setLocalLikesCount(data.likes_count || 0)
      // Check if current user has liked (this is a placeholder - you would check against user ID)
      setIsLiked(false)
    }
  }, [data])

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    // Create a new comment object
    const newComment = {
      id: Date.now(), // Temporary ID
      user: {
        id: 0, // Placeholder - use actual user ID
        first_name: "Current",
        last_name: "User",
        username: "currentuser",
        image_profile: "/diverse-online-profiles.png",
      },
      content: comment,
      created_at: new Date().toISOString(),
    }

    // Add to local comments
    setLocalComments([...localComments, newComment])

    // Reset input
    setComment("")

    // Here you would typically make an API call to save the comment
    console.log("Sending comment:", comment)
  }

  // Handle like toggle
  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
    setLocalLikesCount(isLiked ? localLikesCount - 1 : localLikesCount + 1)

    // Here you would typically make an API call to update the like status
    console.log("Toggling like:", !isLiked)
  }

  return (
    <>
      <Button
        isIconOnly
        variant="flat"
        color="default"
        startContent={<PlayIcon />}
        radius="full"
        size="lg"
        className="w-24 h-24 rounded-full flex items-center justify-center bg-black/60"
        onPress={onOpen}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full" hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="w-full items-center justify-end">
                {/* <div className="flex justify-between items-center"> */}
                  {/* <h2 className="text-xl font-bold">{data.title}</h2> */}
                  <Button variant="light" color="default" endContent={<ArrowRight />}  onPress={onClose}> بازگشت</Button>
                {/* </div> */}
              </ModalHeader>
              <ModalBody className="p-0" >
                <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
                  {/* Left side - Video */}
                  <div className="w-full md:w-2/3 bg-black">
                    <div className="relative h-full">
                      <video
                        ref={videoRef}
                        src={data.file}
                        className="w-full h-full object-contain"
                        onClick={togglePlay}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                      />

                      {/* Play/Pause overlay */}
                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <button
                            onClick={togglePlay}
                            className="w-20 h-20 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm"
                          >
                            <PlayIcon className="w-10 h-10" />
                          </button>
                        </div>
                      )}

                      {/* Custom controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        {/* Progress bar */}
                        <div
                          className="w-full h-2 bg-gray-600 rounded-full mb-4 cursor-pointer"
                          onClick={handleProgressClick}
                        >
                          <div ref={progressRef} className="h-full bg-red-500 rounded-full"></div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Play/Pause button */}
                            <button onClick={togglePlay} className="text-white hover:text-gray-300">
                              {isPlaying ? <PauseIcon /> : <PlayIcon className="w-6 h-6" />}
                            </button>

                            {/* Volume control */}
                            <div className="flex items-center gap-2">
                              <Button onPress={toggleMute} className="text-white hover:text-gray-300">
                                {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
                              </Button>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 accent-red-500"
                              />
                            </div>

                            {/* Time display */}
                            <div className="text-white text-sm">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Fullscreen button */}
                            <Button
                          onPress={handleLikeToggle}
                          variant="light"
                          color="default"
                          // isIconOnly
                          radius="full"
                          // size="lg"
                          className={`flex items-center gap-4 px-3 py-1 rounded-full ${
                            isLiked ? "text-red-500" : "text-gray-700"
                          }`}
                        >
                          <Heart className={isLiked ? "fill-red-500" : "stroke-white"} size={18} />
                          <span>{localLikesCount}</span>
                        </Button>
                            <button onClick={toggleFullscreen} className="text-white hover:text-gray-300">
                              {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

          
                  <div className="w-full md:w-1/3 flex flex-col h-full" dir="rtl">
                    {/* Video info */}
                    <div className="p-4 ">
                      <h2 className="text-xl font-bold mb-2">{data.title}</h2>

                      <p className="text-foreground text-sm">{data.caption}</p>
                          <Divider className="my-4" />
                      <div className="flex items-center justify-between my-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={data.user.image_profile || "/placeholder.svg?height=40&width=40&query=user profile"}
                            alt={`${data.user.first_name} ${data.user.last_name}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium">
                              {data.user.first_name} {data.user.last_name}
                            </h3>
                            <p className="text-sm text-gray-500">@{data.user.username}</p>
                          </div>
                        </div>

                        {/* Like button */}
                       
                      </div>

                    </div>

                    {/* Comments section - scrollable */}
                    <div className="flex-1 overflow-y-auto p-4" dir="rtl">
                      {/* <h3 className="font-medium mb-4">Comments ({localComments.length})</h3> */}
                      {localComments.length > 0 ? (
                        <div className="space-y-4">
                          {localComments.map((comment, index) => (
                            <div key={index} className="flex gap-3">
                              <img
                                src={comment.user?.image_profile || "/placeholder.svg?height=32&width=32&query=user"}
                                alt="User"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium">
                                  {comment.user?.first_name || "User"} {comment.user?.last_name || ""}
                                </p>
                                <p className="text-sm text-gray-700">{comment.content || "Comment content"}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">کامنتی ثبت نشده</p>
                      )}
                    </div>

                    {/* Comment input */}

                    <div className="p-4 bg-default-50">
                      <form onSubmit={handleCommentSubmit} className="flex gap-2">
                        <Input
                          type="text"
                          value={comment}
                          onValueChange={(value) => setComment(value)}
                          placeholder="کامنت کنید..."
                          className="text-right"
                          startContent={
                            <Button type="submit" isIconOnly variant="light" color="default" isDisabled={!comment.trim()} startContent={
                              <SendIcon />
                            }>

                            </Button>
                          }
                        />
                        
                      </form>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

// Icons
const PlayIcon = ({ className = "" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
        fill="currentColor"
      />
    </svg>
  )
}

const PauseIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="4" height="16" rx="2" fill="currentColor" />
      <rect x="14" y="4" width="4" height="16" rx="2" fill="currentColor" />
    </svg>
  )
}

const VolumeOnIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.5 8.70001C14.5 8.70001 16 10.5 16 12C16 13.5 14.5 15.3 14.5 15.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 6.00001C17.5 6.00001 20 8.50001 20 12C20 15.5 17.5 18 17.5 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
    </svg>
  )
}

const VolumeOffIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
      <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const FullscreenIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ExitFullscreenIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 3V5C8 6.10457 7.10457 7 6 7H4M4 17H6C7.10457 17 8 17.8954 8 19V21M16 3V5C16 6.10457 16.8954 7 18 7H20M20 17H18C16.8954 17 16 17.8954 16 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CloseIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const LikeIcon = ({ className = "" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CommentIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const SendIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
