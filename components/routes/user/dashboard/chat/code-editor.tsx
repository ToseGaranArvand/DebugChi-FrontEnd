"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import Editor, { Monaco } from "@monaco-editor/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  onSubmit: (code: string, language: string) => void
}

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "markdown", label: "Markdown" },
]

const THEMES = {
  light: 'vs',
  dark: 'vs-dark'
}

export function CodeEditor({ onSubmit }: CodeEditorProps) {
  const [code, setCode] = React.useState("")
  const [language, setLanguage] = React.useState("javascript")
  const [isDark, setIsDark] = React.useState(false)
  const [isEditorReady, setIsEditorReady] = React.useState(false)

  // Handle Monaco editor initialization
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    setIsEditorReady(true)
    
    // Set editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      minimap: {
        enabled: false
      },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      roundedSelection: true,
      automaticLayout: true,
      padding: {
        top: 16,
        bottom: 16
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    onSubmit(code, language)
    setCode("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="ltr">
      <div className="flex items-center justify-between gap-2">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="انتخاب زبان" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? '🌞' : '🌙'}
        </Button>
      </div>
      <div className={cn(
        "border rounded-lg overflow-hidden",
        isDark ? "border-muted" : "border-input"
      )}>
        <Editor
          height="300px"
          language={language}
          value={code}
          onChange={(value:any) => setCode(value || "")}
          theme={isDark ? THEMES.dark : THEMES.light}
          onMount={handleEditorDidMount}
          loading={<div className="p-4 text-muted-foreground">در حال بارگذاری...</div>}
          options={{
            readOnly: !isEditorReady
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!code.trim() || !isEditorReady}>
          ارسال کد
        </Button>
      </div>
    </form>
  )
}

