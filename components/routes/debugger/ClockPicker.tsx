import React, { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppDispatch, useAppSelector } from '@/redux/store/store'
import { convertShamsiToGregorian } from '@/utils/tools'
import { updateRequest } from '@/redux/slices/consultSlice'

type TimeOfDay = 'morning' | 'afternoon' | 'evening'

interface ClockPickerProps {
  isToday?: boolean
}

const getCurrentTimeOfDay = (): TimeOfDay => {
    const currentHour = new Date().getHours()
    if (currentHour >= 6 && currentHour <= 11) return 'morning'
    if (currentHour >= 12 && currentHour <= 17) return 'afternoon'
    return 'evening'
  }
export const ClockPicker: React.FC<ClockPickerProps> = ({ isToday = true }) => {
    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(() => getCurrentTimeOfDay())
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const _time = useAppSelector(state=>state.consult.request.start_at)

    const dispatch = useAppDispatch()
    const timeRanges = {
      morning: { start: 6, end: 11, label: 'صبح' },
      afternoon: { start: 12, end: 17, label: 'ظهر' },
      evening: { start: 18, end: 23, label: 'شب' },
    }
  

  
    const generateTimeSlots = (start: number, end: number) => {
      const slots = []
      for (let hour = start; hour <= end; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`)
        slots.push(`${hour.toString().padStart(2, '0')}:30`)
      }
      return slots
    }
  
    const filterTimeSlots = (slots: string[]) => {
      if (!isToday) return slots
  
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinutes = now.getMinutes()
  
      return slots.filter((slot) => {
        const [hour, minutes] = slot.split(':').map(Number)
        return hour > currentHour || (hour === currentHour && minutes >= currentMinutes)
      })
    }
 
    const handleTimeSelect = (time: string) => {
      setSelectedTime(time)
      let new_date = convertShamsiToGregorian(`${_time} ${time}:00`)
      dispatch(updateRequest({start_at:new_date}))
    }
  
    const timeSlots = filterTimeSlots(
      generateTimeSlots(timeRanges[timeOfDay].start, timeRanges[timeOfDay].end)
    )
  
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary" className='text-blue-500 flex gap-4'>
            <span>
              {selectedTime ? selectedTime : "زمان جلسه"}
            </span>
            <Clock />
          </Button>
        </DrawerTrigger>
        <DrawerContent className='w-2/4 max-h-[600px] mx-auto'>
          <DrawerHeader className='w-full relative'>
            <DrawerTitle className='absolute right-10'>انتخاب زمان برگزاری</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
  
          <div className="p-4 space-y-6">
            <Tabs defaultValue={timeOfDay} onValueChange={(value) => setTimeOfDay(value as TimeOfDay)}>
              <TabsList className="grid w-full grid-cols-3">
                {Object.entries(timeRanges).map(([key, value]) => (
                  <TabsTrigger key={key} value={key}>{value.label}</TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(timeRanges).map(([key, value]) => (
                <TabsContent key={key} value={key}>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {filterTimeSlots(generateTimeSlots(value.start, value.end)).map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => handleTimeSelect(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
  
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className='bg-slate-200 rounded-lg w-40 h-14 mx-auto text-black hover:bg-slate-300'>
                تایید
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  