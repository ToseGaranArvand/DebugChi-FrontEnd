import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MonacoEditor from "@monaco-editor/react";


interface CodeSnippetDialogProps {
  onSend: (code: string, language: string) => void
  onClose: () => void
}

export default function CodeSnippetDialog({ onSend, onClose }: CodeSnippetDialogProps) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript') // Default language

  const handleSend = () => {
    if (code.trim()) {
      onSend(code, language)
    }
  }

  const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'cpp',
    'html',
    'css',
    'json',
    'markdown',
    'sql',
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>ارسال قطعه کد</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" dir='ltr'>
          <div className="border rounded-md p-2" style={{ height: '400px', overflow: 'hidden' }}>
            <MonacoEditor
              height="100%"
              language={language}
              value={code}
              theme="vs-dark" // You can change to "light" or "vs-light" as well
              options={{
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: { enabled: true },
                automaticLayout: true,
              }}
              onChange={(value) => setCode(value || '')}
            />
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="زبان برنامه‌نویسی را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            لغو
          </Button>
          <Button onClick={handleSend} disabled={!code.trim()}>
            ارسال
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

