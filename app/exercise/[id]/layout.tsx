import ExerciseHeader from "@/components/layout/exercise-header";
import { RootFooter } from "@/components/layout/root-footer";

const ExerciseDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <ExerciseHeader />
      <main className="flex flex-col flex-1">{children}</main>
      <RootFooter />
    </div>
  );
};

export default ExerciseDetailLayout;
