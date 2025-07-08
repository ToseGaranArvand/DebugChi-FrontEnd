import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'

type FileUploadProps = {
  form: UseFormReturn<any>
  name: string
  label: string
  description: string
}

export function FileUpload({ form, name, label, description }: FileUploadProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0]
                if (file) {
                  onChange(file)
                }
              }}
              {...rest}
              // Remove the value prop from being passed to Input
              value={value instanceof File ? undefined : value}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

