"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password:z.string().min(8, {
      message:"کلمه عبور حداقل 8 کارکتر می باشد"
  }).max(16, {
      message:"کلمه عبور حداکثر 16 کارکتر می باشد"
  })
})

export function CreateForm() {
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "hello",
    },
  })

  const  onSubmit = async (values: z.infer<typeof formSchema>)=> {
  console.log(values)
}
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="box-border p-5 space-y-8 border rounded-lg my-10" >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام کاربری</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کلمه عبور</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} type="password" />
              </FormControl>
              <FormDescription>
                کلمه عبور باید حداقل 8 کارکتر باشد و حداکثر 16 کارکتر باشد
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
