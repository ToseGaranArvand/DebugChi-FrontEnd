"use client";
import React from "react";
import AceEditor from "react-ace";

// Import language and theme
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = () => {
  const defaultCode = `function greet(name) {\n  return "Hello, " + name + "!";\n}`;

  return (
    <AceEditor
      mode="javascript" // Set the language mode
      theme="monokai" // Set the theme
      value={defaultCode} // Set the initial value
      name="readonly-editor" // A unique ID for the editor
      readOnly={true} // Make the editor read-only
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        fontSize: 14, // Set font size
        showLineNumbers: true, // Show line numbers
        tabSize: 2, // Set tab size
        useWorker: false,
      }}
      width="100%"
      height="300px"
    />
  );
};

export default CodeEditor;
