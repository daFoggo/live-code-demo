import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import { Typography } from "@/components/common/typography";
import { Separator } from "@/components/ui/separator";
import { IExercise } from "../utils/types";
import { ExerciseLevelBadge } from "./exercise-level-badge";

export interface IExerciseDescriptionProps {
  exerciseData: IExercise;
}
export const ExerciseDescription = ({
  exerciseData,
}: IExerciseDescriptionProps) => {
  return (
    <div className="flex flex-col gap-3 w-full max-h-full overflow-auto align-start">
      <div>
        <Typography variant="h2">{exerciseData.name}</Typography>
        <ExerciseLevelBadge
          level={exerciseData.level}
          className="font-semibold text-sm"
        />
      </div>
      <Separator />
      <div>
        <MarkdownKatexRenderer content={exerciseData.statement} />
      </div>
    </div>
  );
};
