"use client";
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formFields, formSchema } from './schema'
import { useForm } from 'react-hook-form'
import { FileUpload } from './FileUpload';

type Props = {}

const SignUp = () => {
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "hello",
      password:"hello",
      
    },

  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="box-border p-5 space-y-8 border rounded-lg my-10">
      {formFields.map((field) => {
        if (field.type === "file") {
          return (
            <FileUpload
              key={field.name}
              form={form}
              name={field.name}
              label={field.label}
              description={field.description}
            />
          )
        }
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input placeholder={field.placeholder} {...formField} type={field.type} />
                </FormControl>
                <FormDescription>
                  {field.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SignUp