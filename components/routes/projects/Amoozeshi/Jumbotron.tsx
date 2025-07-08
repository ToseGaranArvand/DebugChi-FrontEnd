import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Jumbotron = (props: Props) => {
  return (
    <section>
        <div
          className="flex flex-col items-center justify-center w-full h-[500px] text-background gap-4 relative bg-gradient-to-b from-transparent to-black"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('/images/domingo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1>آموزش‌های موجود</h1>
          <div className="flex items-center gap-5">
            <Link href={"#"}>نمایش آموزش‌ها</Link>
            <Button variant="default">آموزش می‌دهم</Button>
          </div>
          <Input
            placeholder="جستجو..."
            className="w-3/4 absolute -bottom-5 bg-white h-14 rounded-xl text-foreground dark:text-background"
          />
        </div>
      </section>
  )
}

export default Jumbotron