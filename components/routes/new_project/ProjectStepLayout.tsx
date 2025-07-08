import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ProjectStepLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  onNext: () => void
  onPrevious: () => void
  isNextDisabled?: boolean
}

export const ProjectStepLayout: React.FC<ProjectStepLayoutProps> = ({
  title,
  description,
  children,
  onNext,
  onPrevious,
  isNextDisabled = false,
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-[600px] h-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex gap-2">
          <Button className="rounded-full flex-1" onClick={onNext} disabled={isNextDisabled}>
            <ArrowRight />
            <span>بعدی</span>
          </Button>
          <Button className="rounded-full flex-1" variant="outline" onClick={onPrevious}>
            <span>بازگشت</span>
            <ArrowLeft />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

