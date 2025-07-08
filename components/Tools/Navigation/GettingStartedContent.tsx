import * as React from "react"
import { NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Home } from 'lucide-react'
import { ListItem } from "./ListItems"

export default function GettingStartedContent() {
  return (
    <NavigationMenuContent>
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <li className="row-span-3">
      
            <a
              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
              href="/"
            >

              <Home className="h-6 w-6" />
              <div className="mb-2 mt-4 text-lg font-medium">
                shadcn/ui
              </div>
              <p className="text-sm leading-tight text-muted-foreground">
                Beautifully designed components built with Radix UI and
                Tailwind CSS.
              </p>
            </a>

        </li>
        <ListItem href="/docs" title="Introduction">
          Re-usable components built using Radix UI and Tailwind CSS.
        </ListItem>
        <ListItem href="/docs/installation" title="Installation">
          How to install dependencies and structure your app.
        </ListItem>
        <ListItem href="/docs/primitives/typography" title="Typography">
          Styles for headings, paragraphs, lists...etc
        </ListItem>
      </ul>
    </NavigationMenuContent>
  )
}

