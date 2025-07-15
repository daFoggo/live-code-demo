import PageHeader from "@/components/common/page-header";
import { ExerciseTable } from "./ExerciseTable";

export const Exercises = () => {
  return (
    <div className="flex flex-col gap-6 py-6 sm:py-12 container">
      <PageHeader
        breadcrumbs={[{ href: "/dashboard", label: "Dashboard" }]}
        title="Danh sách bài tập"
      />
      <ExerciseTable />
    </div>
  );
};
