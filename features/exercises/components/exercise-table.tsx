"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { cn, enumToOptions } from "@/lib/utils";
import type { Column, ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";
import { EXERCISE_LEVEL, SAMPLE_EXERCISE } from "../utils/constants";
import type { IExercise } from "../utils/types";
import { Checkbox } from "@/components/ui/checkbox";

export const ExerciseTable = () => {
  const router = useRouter();

  function handleNavigateExercise(exercise: IExercise) {
    router.push(`/exercises/${exercise.id}`);
  }

  const columns = React.useMemo<ColumnDef<IExercise>[]>(
    () => [
       {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }: { column: Column<IExercise, unknown> }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ cell }) => (
          <div className="bg-muted px-3 py-1 rounded-lg w-fit font-mono font-medium">
            {cell.getValue<IExercise["id"]>()}
          </div>
        ),
        meta: {
          label: "ID",
        },
        size: 30,  
      },
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }: { column: Column<IExercise, unknown> }) => (
          <DataTableColumnHeader column={column} title="Tên bài" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<IExercise["name"]>()}</div>,
        meta: {
          label: "Tên bài",
          placeholder: "Tìm kiếm theo tên bài",
          variant: "text",
        },
        enableColumnFilter: true,
      },
      {
        id: "level",
        accessorKey: "level",
        header: ({ column }: { column: Column<IExercise, unknown> }) => (
          <DataTableColumnHeader column={column} title="Mức độ" />
        ),
        cell: ({ cell }) => (
          <div>{RenderLevelCell(cell.getValue<IExercise["level"]>())}</div>
        ),
        meta: {
          label: "Mức độ",
          variant: "multiSelect",
          options: enumToOptions(EXERCISE_LEVEL),
        },
        enableColumnFilter: true,
        enableSorting: false,
      },
    ],
    []
  );

  const { table } = useDataTable({
    data: SAMPLE_EXERCISE,
    columns,
    pageCount: 1,
    // initialState: {
    //   sorting: [{ id: "title", desc: true }],
    //   columnPinning: { right: ["actions"] },
    // },
    getRowId: (row) => row.id,
  });

  return (
    <DataTable table={table} onRowClick={handleNavigateExercise}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
};

const RenderLevelCell = (level: EXERCISE_LEVEL) => {
  return (
    <Badge
      className={cn(
        "font-medium text-xs",
        level === EXERCISE_LEVEL.EASY
          ? "bg-green-500/10 text-green-500"
          : level === EXERCISE_LEVEL.MEDIUM
          ? "bg-yellow-500/10 text-yellow-500"
          : "bg-red-500/10 text-red-500"
      )}
    >
      {level}
    </Badge>
  );
};
