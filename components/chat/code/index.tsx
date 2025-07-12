import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Code } from "lucide-react";
import { useAppDispatch } from "@/redux/store/store";
import { v4 } from "uuid";
import { setMessage } from "@/redux/slices/chatSocketSlice";
import { socket } from "@/config/socket-config";
import { usePathname } from "next/navigation";

// Full list of Monaco-supported languages
const languages = [
  "abap",
  "apex",
  "azcli",
  "bat",
  "c",
  "clojure",
  "coffeescript",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dart",
  "dockerfile",
  "ecl",
  "elixir",
  "erlang",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "hcl",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "less",
  "lua",
  "markdown",
  "matlab",
  "mdx",
  "mysql",
  "objective-c",
  "pascal",
  "perl",
  "pgsql",
  "php",
  "plaintext",
  "postiats",
  "powerquery",
  "powershell",
  "proto",
  "pug",
  "python",
  "r",
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "scala",
  "scheme",
  "scss",
  "shell",
  "sol",
  "sql",
  "st",
  "swift",
  "systemverilog",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml",
].map((lang) => ({ key: lang, label: lang.toUpperCase() })); // Format labels

const fontSizes = [
  { key: "14", label: "14px" },
  { key: "18", label: "18px" },
  { key: "24", label: "24px" },
  { key: "32", label: "32px" },
  { key: "40", label: "40px" },
  { key: "52", label: "52px" },
];

type Props = {
  sender:string;
  reciever:string;
}

const SendCode = ({sender,reciever}:Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(18);
  const dispatch = useAppDispatch();
    const path = usePathname()
    const session_id = path.split('/')[2]
  
  const sendMessage = () => {
    const data = {
      session_id:session_id,
      sender: sender,
      receiver: reciever,
      data: {
        id:v4(),
        type:"code",
        text: code,
        language:language,
        created_at: String(new Date()),
        status:"pending",
      }
    }

    dispatch(setMessage(data))
    socket.emit("test_message", data );
  };
  return (
    <>
<div 
  className="bg-[#1C1C1CB2] text-white w-5 h-5 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
  onClick={onOpen}
>
  <Code size={10} />
</div>

      <Drawer
      hideCloseButton   
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        placement="left"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex  gap-3">

                <Select
                  label="انتخاب زبان"
                  selectedKeys={[language]}
                  onSelectionChange={(keys) =>
                    setLanguage(Array.from(keys)[0] as string)
                  }
                >
                  {languages.map((lang) => (
                    <SelectItem key={lang.key}>{lang.label}</SelectItem>
                  ))}
                </Select>


                <Select
                  label="اندازه فونت"
                  selectedKeys={[String(fontSize)]}
                  onSelectionChange={(keys) =>
                    setFontSize(Number(Array.from(keys)[0]))
                  }
                >
                  {fontSizes.map((size) => (
                    <SelectItem key={size.key}>{size.label}</SelectItem>
                  ))}
                </Select>
              </DrawerHeader>

              <DrawerBody dir="ltr">
                <MonacoEditor
                  width="100%"
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(newValue) => setCode(newValue || "")}
                  options={{
                    scrollBeyondLastLine: false,
                    minimap: { enabled: true },
                    automaticLayout: true,
                    fontSize: fontSize,
                  }}
                />
              </DrawerBody>

              <DrawerFooter>
                
                <Button color="primary" variant="flat" onPress={sendMessage}>
                  ارسال کد
                </Button>
                <Button color="primary" variant="flat" onPress={onClose}>
                  بستن
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SendCode;
