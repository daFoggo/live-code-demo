import { ExerciseLevel, STEP_STATUS } from "./constants";

export interface ITestCase {
  id: string;
  input: string;
  output: string;
  isPublic: boolean;
}

export interface IStep {
  title: string;
  description: string;
  code: string;
}
export interface IExercise {
  id: string;
  name: string;
  statement: string;
  function_signature?: string;
  testcases: ITestCase[];
  steps?: IStep[];
  example_code?: string;
  level?: ExerciseLevel;
}

export interface IMessage {
  feedback: string;
  stepStatus?: STEP_STATUS.PASSED | STEP_STATUS.NOT_PASSED;
  metadata: {
    messageId: string;
    timestamp: string;
    sender: "ai_tutor" | "user";
    type: "feedback" | "question";
  };
}

export interface ICodeEditorLanguage {
  value: string;
  label: string;
  extension: string;
}

export interface ITab {
  label: string;
  value: string;
  icon: ReactNode;
  contentComponent: ReactNode;
}
