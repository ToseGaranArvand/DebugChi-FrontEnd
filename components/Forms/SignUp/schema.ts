import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const formSchema = z.object({
  username: z.string().min(2, {
    message: "نام کاربری باید حداقل 2 کاراکتر باشد.",
  }),
  password: z.string().min(8, {
    message: "کلمه عبور حداقل 8 کاراکتر می باشد"
  }).max(16, {
    message: "کلمه عبور حداکثر 16 کاراکتر می باشد"
  })
})

export type FormField = {
  name: keyof z.infer<typeof formSchema>
  label: string
  placeholder: string
  description: string
  type?: string
}

export const formFields: FormField[] = [
  {
    name: "username",
    label: "نام کاربری",
    placeholder: "نام کاربری خود را وارد کنید",
    description: "این نام عمومی شما خواهد بود.",
  },
  {
    name: "password",
    label: "کلمه عبور",
    placeholder: "کلمه عبور خود را وارد کنید",
    description: "کلمه عبور باید حداقل 8 کاراکتر و حداکثر 16 کاراکتر باشد",
    type: "password",
  }
  
]

