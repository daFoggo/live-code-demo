"use client";

import { AsyncButton } from "@/components/common/async-button";
import { CodeEditor } from "@/components/common/code-editor";
import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Box,
  ChevronLeft,
  ChevronRight,
  Grid2x2,
  Maximize,
  Minimize,
  Play,
  SquareChevronUp,
  Zap,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { IAIFeedbackParams } from "../services/ai-feedback";
import {
  AI_FEEDBACK_MODE,
  CODE_EDITOR_LANGUAGE_TEMPLATES,
  CODE_EDITOR_LANGUAGES,
} from "../utils/constants";
import type { IExercise, IMessage } from "../utils/types";

interface IExerciseCodeEditorProps {
  exerciseData: IExercise;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  toggleTestCaseCollapse?: () => void;
  isFullscreen?: boolean;
  toggleFullscreen?: () => void;
  getFeedback: (params: IAIFeedbackParams) => Promise<IMessage>;
}

export const ExerciseCodeEditor = ({
  exerciseData,
  isCollapsed = false,
  toggleCollapse,
  toggleTestCaseCollapse,
  isFullscreen = false,
  toggleFullscreen,
  getFeedback,
}: IExerciseCodeEditorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(
    exerciseData?.function_signature || CODE_EDITOR_LANGUAGE_TEMPLATES.python
  );
  const [mode, setMode] = useState<AI_FEEDBACK_MODE>(
    AI_FEEDBACK_MODE.FULL_CODE
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const previousCodeRef = useRef<string>(code);
  const mountedRef = useRef<boolean>(false);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    const newCode =
      exerciseData?.function_signature ||
      CODE_EDITOR_LANGUAGE_TEMPLATES[
        language as keyof typeof CODE_EDITOR_LANGUAGE_TEMPLATES
      ] ||
      "";

    setCode(newCode);
    previousCodeRef.current = newCode;
  };

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
  };

  const handleModeChange = (checked: boolean) => {
    const newMode = checked
      ? AI_FEEDBACK_MODE.STEP_CODE
      : AI_FEEDBACK_MODE.FULL_CODE;
    setMode(newMode);

    if (checked) {
      setCurrentStep(0);
    }
  };

  const handleStepChange = (stepIndex: number) => {
    if (mode === AI_FEEDBACK_MODE.STEP_CODE && exerciseData?.steps) {
      setCurrentStep(stepIndex);
    }
  };

  const handleRunCode = () => {
    console.log("Running code:", code);
    toast.warning("Running code is not implemented yet xD.");
    toggleTestCaseCollapse?.();
    toggleFullscreen?.();
  };

  const handleSubmitCode = () => {
    console.log("Submitting code:", code);
    toast.warning("Submitting code is not implemented yet xD.");
    toggleTestCaseCollapse?.();
    toggleFullscreen?.();
  };

  const callAIFeedback = async () => {
    if (exerciseData.statement && code.trim()) {
      try {
        setIsGettingFeedback(true);
        let exampleCode = "";
        if (mode === AI_FEEDBACK_MODE.FULL_CODE) {
          exampleCode = exerciseData.example_code || "";
        } else if (mode === AI_FEEDBACK_MODE.STEP_CODE && exerciseData.steps) {
          exampleCode = exerciseData.steps[currentStep]?.code || "";
        }

        await getFeedback({
          inputs: {
            mode: mode,
            purpose: exerciseData.statement,
            example_code: exampleCode,
            user_code: code,
          },
          response_mode: "blocking",
          user: "abc-123",
        });
      } catch (error) {
        console.error("Lỗi khi gọi AI feedback:", error);
      } finally {
        setIsGettingFeedback(false);
      }
    }
  };

  const handleManualFeedback = () => {
    callAIFeedback();
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    if (!mountedRef.current) {
      mountedRef.current = true;
      previousCodeRef.current = code;
      return;
    }

    const hasCodeChanged = code !== previousCodeRef.current;
    if (!hasCodeChanged) {
      return;
    }

    const initialTemplate =
      CODE_EDITOR_LANGUAGE_TEMPLATES[
        selectedLanguage as keyof typeof CODE_EDITOR_LANGUAGE_TEMPLATES
      ];
    const isCodeDifferentFromTemplate = code.trim() !== initialTemplate.trim();
    const isCodeNotEmpty = code.trim() !== "";

    if (isCodeDifferentFromTemplate && isCodeNotEmpty) {
      console.log("Code changed, setting 30s timer for AI feedback...");
      debounceRef.current = setTimeout(() => {
        console.log("Calling AI feedback after 30s delay");
        callAIFeedback();
      }, 30000);
    }

    previousCodeRef.current = code;

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [code, selectedLanguage, exerciseData.statement, mode, currentStep]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (mode === AI_FEEDBACK_MODE.STEP_CODE && !isFullscreen) {
      toggleFullscreen?.();
    }
  }, [mode, isFullscreen, toggleFullscreen]);

  const totalSteps = exerciseData?.steps?.length || 0;

  return (
    <Card
      className={cn(
        "flex flex-col justify-center h-full overflow-hidden",
        isCollapsed && "p-0 gap-0"
      )}
    >
      <CardHeader className="flex-shrink-0 p-4">
        <div className="flex items-center gap-2 min-w-0 overflow-x-auto scrollbar-hide">
          <div className="flex-shrink-0">
            <Select
              value={selectedLanguage}
              onValueChange={handleLanguageChange}
              defaultValue="python"
            >
              <SelectTrigger className="w-[120px] sm:w-[140px]">
                <SelectValue placeholder="Ngôn ngữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Các ngôn ngữ hỗ trợ</SelectLabel>
                  {CODE_EDITOR_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {!isCollapsed && (
            <div className="flex flex-shrink-0 items-center gap-1.5 bg-muted/50 px-4 py-2 rounded-md h-full text-xs">
              <Box className="flex-shrink-0 size-4 text-muted-foreground" />
              <span className="hidden sm:inline">Toàn bộ</span>
              <Switch
                checked={mode === AI_FEEDBACK_MODE.STEP_CODE}
                onCheckedChange={handleModeChange}
              />
              <span className="hidden sm:inline">Bước</span>
              <Grid2x2 className="flex-shrink-0 size-4 text-muted-foreground" />
            </div>
          )}

          {!isCollapsed &&
            mode === AI_FEEDBACK_MODE.STEP_CODE &&
            exerciseData?.steps && (
              <div className="flex flex-shrink-0 items-center gap-1.5 min-w-0">
                <Button
                  variant="ghost"
                  onClick={() => handleStepChange(currentStep - 1)}
                  disabled={currentStep === 0}
                  className="flex-shrink-0 p-0 size-8"
                >
                  <ChevronLeft className="size-4" />
                </Button>

                <div className="flex items-center gap-1 min-w-0">
                  <Badge
                    variant="outline"
                    className="flex-shrink-0 px-1.5 py-0.5 text-xs"
                  >
                    {currentStep + 1}/{totalSteps}
                  </Badge>
                  <span className="hidden sm:inline max-w-[100px] text-muted-foreground text-xs truncate">
                    {exerciseData.steps[currentStep]?.title ||
                      `Bước ${currentStep + 1}`}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => handleStepChange(currentStep + 1)}
                  disabled={currentStep === totalSteps - 1}
                  className="flex-shrink-0 p-0 size-8"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}

          <div className="flex-1 min-w-0"></div>

          <div className="flex flex-shrink-0 items-center gap-1">
            {toggleFullscreen && (
              <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <Minimize className="size-4" />
                ) : (
                  <Maximize className="size-4" />
                )}
              </Button>
            )}
            {toggleCollapse && (
              <Button variant="ghost" size="icon" onClick={toggleCollapse}>
                <ChevronLeft
                  className={cn("size-4", isCollapsed && "rotate-180")}
                />
              </Button>
            )}
          </div>
        </div>

        {!isCollapsed &&
          mode === AI_FEEDBACK_MODE.STEP_CODE &&
          exerciseData?.steps && (
            <div className="space-y-2 mt-3">
              <div className="flex gap-0.5 overflow-x-auto scrollbar-hide">
                {exerciseData.steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepChange(index)}
                    className={cn(
                      "flex-1 rounded-full h-2 transition-colors",
                      index === currentStep
                        ? "bg-primary"
                        : index < currentStep
                        ? "bg-primary/60"
                        : "bg-muted"
                    )}
                  />
                ))}
              </div>

              {exerciseData.steps[currentStep]?.description && (
                <div className="bg-muted/50 mt-2 p-1 rounded max-h-20 overflow-y-auto text-xs scrollbar-thin">
                  <MarkdownKatexRenderer
                    content={exerciseData.steps[currentStep].description}
                  />
                </div>
              )}
            </div>
          )}
      </CardHeader>

      {!isCollapsed && (
        <>
          <CardContent className="flex-1 p-0 min-h-0 overflow-hidden">
            <div className="h-full">
              <CodeEditor
                selectedLanguage={selectedLanguage}
                code={code}
                handleEditorChange={handleEditorChange}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 align-bottom">
            <AsyncButton
              onClick={handleRunCode}
              icon={<Play />}
              disabled={!code.trim()}
              variant="secondary"
            >
              Chạy
            </AsyncButton>

            <AsyncButton
              onClick={handleManualFeedback}
              icon={<Zap />}
              disabled={!code.trim() || isGettingFeedback}
              variant="outline"
              isLoading={isGettingFeedback}
            >
              Đánh giá
            </AsyncButton>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <AsyncButton icon={<SquareChevronUp />} disabled={!code.trim()}>
                  Nộp bài
                </AsyncButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận nộp bài</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn nộp bài này không? Bạn vẫn có thể quay
                    lại chỉnh sửa sau khi nộp
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmitCode}>
                    Xác nhận
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
