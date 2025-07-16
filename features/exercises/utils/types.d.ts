import { ExerciseLevel } from "./constants";

export interface ITestCase {
  id: string;
  input: string;
  output: string;
  isPublic: boolean;
}
export interface IExercise {
  id: string;
  name: string;
  statement: string;
  testcase: ITestCase[];
  level: ExerciseLevel;
}
