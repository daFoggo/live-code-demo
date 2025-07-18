"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookMarked,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  FileClock,
  ScrollText,
} from "lucide-react";
import { IExercise, ITab } from "../utils/types";
import { ExerciseDescription } from "./exercise-description";

export interface IExerciseInfoProps {
  exerciseData: IExercise;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

export const ExerciseInfo = ({
  exerciseData,
  isCollapsed = false,
  toggleCollapse,
}: IExerciseInfoProps) => {
  const TABS: ITab[] = [
    {
      label: "Mô tả",
      value: "description",
      icon: <ScrollText />,
      contentComponent: <ExerciseDescription exerciseData={exerciseData} />,
    },
    {
      label: "Hướng dẫn",
      value: "editorial",
      icon: <BookMarked />,
      contentComponent: <div>Editorial content goes here.</div>,
    },
    {
      label: "Giải pháp",
      value: "solution",
      icon: <BookOpenCheck />,
      contentComponent: <div>Solution content goes here.</div>,
    },
    {
      label: "Lịch sử",
      value: "history",
      icon: <FileClock />,
      contentComponent: <div>History content goes here.</div>,
    },
  ];

  return (
    <Card className="flex flex-col w-full h-full overflow-x-auto">
      <CardHeader className="flex flex-col flex-1 min-h-0">
        <Tabs
          defaultValue={TABS[0].value}
          className="flex flex-col w-full h-full"
        >
          {isCollapsed ? (
            // Collapsed
            <div className="flex flex-col items-center h-full">
              <div className="flex justify-between items-center mb-2">
                {toggleCollapse && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleCollapse}
                  >
                    <ChevronRight />
                  </Button>
                )}
              </div>
              <TabsList className="flex flex-col gap-1 h-full">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex-col justify-center items-center gap-1 px-2 py-3 w-full h-auto"
                  >
                      {tab.icon}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          ) : (
            // Normal
            <>
              <div className="flex flex-shrink-0 justify-between items-center">
                <TabsList>
                  {TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="px-3"
                    >
                      {tab.icon}
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {toggleCollapse && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCollapse}
                    className="ml-2 p-0 size-8"
                  >
                    <ChevronLeft />
                  </Button>
                )}
              </div>
              <div className="flex-1 min-h-0">
                {TABS.map((tab) => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:flex data-[state=active]:flex-col w-full h-full"
                  >
                    <div className="flex-1 overflow-auto">
                      {tab.contentComponent}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </>
          )}
        </Tabs>
      </CardHeader>
    </Card>
  );
};
