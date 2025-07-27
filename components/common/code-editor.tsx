import { Editor } from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PageLoader } from "./page-loader";

interface ICodeEditorProps {
  selectedLanguage: string;
  code: string;
  handleEditorChange: (value: string | undefined) => void;
}

export const CodeEditor = ({
  selectedLanguage,
  code,
  handleEditorChange,
}: ICodeEditorProps) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const editorRef = useRef<any>(null);
  const isUnmountingRef = useRef(false);
  const monacoRef = useRef<any>(null);
  const changeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle editor mount with better error handling
  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    if (isUnmountingRef.current) return;

    try {
      editorRef.current = editor;
      monacoRef.current = monaco;
      setIsEditorReady(true);
      setIsInitialized(true);

      // Focus the editor after a short delay to ensure it's fully mounted
      setTimeout(() => {
        if (!isUnmountingRef.current && editorRef.current) {
          try {
            editorRef.current.focus();
          } catch (error) {
            console.warn("Editor focus warning:", error);
          }
        }
      }, 100);
    } catch (error) {
      console.error("Editor mount error:", error);
      setIsEditorReady(false);
      setIsInitialized(false);
    }
  }, []);

  // Safe change handler with debouncing
  const safeHandleEditorChange = useCallback(
    (value: string | undefined) => {
      if (isUnmountingRef.current || !isEditorReady || !isInitialized) {
        return;
      }

      // Clear previous timeout
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }

      // Debounce the change handler to prevent rapid updates
      changeTimeoutRef.current = setTimeout(() => {
        if (!isUnmountingRef.current && isEditorReady && isInitialized) {
          try {
            handleEditorChange(value);
          } catch (error) {
            console.warn("Editor change handler error:", error);
          }
        }
      }, 100);
    },
    [handleEditorChange, isEditorReady, isInitialized]
  );

  // Handle validation state changes
  const handleValidationFailed = useCallback((markers: any[]) => {
    if (!isUnmountingRef.current) {
      console.warn("Monaco validation errors:", markers);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isUnmountingRef.current = true;
      setIsEditorReady(false);
      setIsInitialized(false);

      // Clear any pending timeouts
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
        changeTimeoutRef.current = null;
      }

      // Clear references
      editorRef.current = null;
      monacoRef.current = null;
    };
  }, []);


  return (
    <div style={{ height: "100%" }}>
      <Editor
        height="100%"
        language={selectedLanguage}
        value={code}
        onChange={safeHandleEditorChange}
        onMount={handleEditorDidMount}
        onValidate={handleValidationFailed}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: "on",
          contextmenu: true,
          selectOnLineNumbers: true,
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderLineHighlight: "line",
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
          },
          readOnly: false,
          domReadOnly: false,
          renderValidationDecorations: "off",
          renderWhitespace: "none",
        }}
        loading={<PageLoader variant="terminal" text="Loading editor..." />}
      />
    </div>
  );
};
