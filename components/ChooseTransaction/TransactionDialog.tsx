'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/redux/store/store"
import { formatCurrency, toBase64 } from "@/utils/tools"
import { Banknote, Coins } from 'lucide-react'
import { submitConsultRequest, updateRequest } from "@/redux/slices/consultSlice"
import {socket} from "@/config/socket-config"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export function TransactionDialog() {
  const user = useAppSelector(state => state.user.user)
  const [open,setOpen] = useState<boolean>(false)
  const {request,error,loading,success} = useAppSelector(state=>state.consult)
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'credit' | null>(null)
  const [comments, setComments] = useState("")
  const dispatch = useAppDispatch()
  const params = useParams()
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const base64 = await toBase64(file);
      dispatch(updateRequest({ file: base64 }));
    }
  };
  useEffect(()=>{
    success ? setOpen(false) : ""
  },[success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button className="w-1/4 h-20"  onClick={()=>setOpen(true)}>ثبت مشاوره</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-3xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>پرداخت</DialogTitle>
          <DialogDescription>
            نحوه پرداخت خود را انتخاب کنید
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>روش پرداخت</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={paymentMethod === 'bank' ? 'default' : 'outline'}
                className="h-20 justify-start"
                onClick={() => setPaymentMethod('bank')}
              >
                <Banknote className="mr-2 h-4 w-4" />
                پرداخت بانکی
              </Button>
              <Button
                variant={paymentMethod === 'credit' ? 'default' : 'outline'}
                className="h-20 justify-start"
                onClick={() => setPaymentMethod('credit')}
              >
                <Coins className="mr-2 h-4 w-4" />
                <span className="ml-2">اعتبار شما</span>
                <span className="mr-auto">{formatCurrency(user?.digital_wallet || 0)}</span>
              </Button>
            </div>

          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">توضیحات</Label>
            <Textarea
              id="comments"
              placeholder="توضیحات خود را اینجا وارد کنید"
              value={request.description || ""} // مقدار مرتبط با Redux
              onChange={(e) => dispatch(updateRequest({ description: e.target.value }))}
            />
          </div>
          <div>
            <Input type="file" placeholder="" onChange={handleFileChange}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={!paymentMethod} onClick={()=>{
            dispatch(updateRequest({description:comments}))
            dispatch(submitConsultRequest(request))
            socket.emit('notification',{
              id: user?.uuid,
              uuid: params.debugger
            })
            
            }}>ثبت نهایی</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

