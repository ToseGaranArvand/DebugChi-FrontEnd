'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MessageSquare, Phone, Video } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import {socket} from '@/config/socket-config'
import { useAppSelector } from '@/redux/store/store'
import { id } from 'date-fns/locale'

type Props = {
    debugger_applicator: number
    debugger: number
    uuid:string
}

type ConsultRequest = {
  debuger: number | null
  debuger_applicator: number | null
  description: string
  file: File | null
  price: number | null
  discount: number | null
  mode: string | null
  duration: number | null
}

const RequestConsultant = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useAppSelector(state => state.user.user)
  const [request, setRequest] = useState<ConsultRequest>({
    debuger: props.debugger,
    debuger_applicator: props.debugger_applicator,
    description: '',
    file: null,
    price: null,
    discount: 0,
    mode: null,
    duration: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRequest(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setRequest(prev => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleModeChange = (value: string) => {
    setRequest(prev => ({
      ...prev,
      mode: value,
      price: prev.duration ? calculatePrice(prev.duration, value) : null
    }))
  }

  const handleDurationChange = (value: string) => {
    const duration = parseInt(value)
    setRequest(prev => ({
      ...prev,
      duration: duration,
      price: calculatePrice(duration, prev.mode)
    }))
  }

  const calculatePrice = (duration: number, mode: string | null) => {
    const basePrice = 100 // Base price per 20 minutes for chat
    let multiplier = 1

    if (mode === 'voice_call') {
      multiplier = 1.5 // 50% increase for voice calls
    } else if (mode === 'video_call') {
      multiplier = 2 // 100% increase for video calls
    }

    return Math.round((duration / 20) * basePrice * multiplier)
  }

  useEffect(() => {
    if (request.duration && request.mode) {
      setRequest(prev => ({ ...prev, price: calculatePrice(prev.duration!, prev.mode) }))
    }
  }, [request.duration, request.mode])

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(request)
    e.preventDefault()
    try {
      console.log(request)
      const response = await axios.post(`${process.env.server}/api/v1/debug-hub/`, request, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      const res = await response.data
      if (res.session_id) {
        toast.success("موفق",{
          description: 'درخواست مشاوره شما با موفقیت ثبت شد.',
          
        })
        socket.emit('notification',{
          id: user?.uuid,
          uuid: props.uuid
        })
        setIsOpen(false)
      } 
      else {
        throw new Error('خطا در ارسال درخواست')
      
      }
    } catch (error) {
      console.log(error)
      toast.error('خطا',{
        description: 'مشکلی در ارسال درخواست پیش آمد. لطفا دوباره تلاش کنید.'
      })
    }
  }

  return (
    <Sheet open={false}>
      <SheetTrigger  className='rounded-md border text-sm bg-blue-600 dark:bg-slate-900 h-9 px-4 py-2 text-background dark:text-foreground font-light'>
        درخواست مشاوره و دیباگ
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>درخواست مشاوره و دیباگ</SheetTitle>
          <SheetDescription>
            لطفا فرم زیر را برای درخواست مشاوره و دیباگ پر کنید.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className='flex-1 overflow-y-auto'>
          <div className='space-y-4 py-4'>
            <Textarea
              name="description"
              placeholder="توضیحات"
              value={request.description}
              onChange={handleInputChange}
            />
            <Input
              type="file"
              onChange={handleFileChange}
            />
            <div className="space-y-2">
              <Label>حالت مشاوره</Label>
              <RadioGroup
                onValueChange={handleModeChange}
                className="grid grid-cols-3 gap-4"
              >
                <Label
                  htmlFor="chat"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="chat" id="chat" className="sr-only" />
                  <MessageSquare className="mb-3 h-6 w-6" />
                  چت
                </Label>
                <Label
                  htmlFor="voice_call"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="voice_call" id="voice_call" className="sr-only" />
                  <Phone className="mb-3 h-6 w-6" />
                  تماس صوتی
                </Label>
                <Label
                  htmlFor="video_call"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="video_call" id="video_call" className="sr-only" />
                  <Video className="mb-3 h-6 w-6" />
                  تماس تصویری
                </Label>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>مدت زمان</Label>
              <RadioGroup
                onValueChange={handleDurationChange}
                className="grid grid-cols-3 gap-4"
              >
                {[20, 40, 60].map((duration) => (
                  <Label
                    key={duration}
                    htmlFor={`r${duration}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value={duration.toString()} id={`r${duration}`} className="sr-only" />
                    {duration} دقیقه
                  </Label>
                ))}
              </RadioGroup>
            </div>
            {request.price && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">قیمت: {request.price} تومان</div>
                </CardContent>
              </Card>
            )}
          </div>
        </form>
        <SheetFooter>
          <Button type="submit" className='w-full' onClick={handleSubmit}>ارسال درخواست</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default RequestConsultant

