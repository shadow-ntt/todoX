import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
//icon
import { Funnel } from "lucide-react";
//
import { filterType } from "@/lib/data";

import { cn } from "@/lib/utils";

export default function StatsAndFilter({
  doing = 0,
  finish = 0,
  filter = "all",
  setFilter,
  children,
  ...prop
}) {
  return (
    <div
      className={cn("relative flex flex-row justify-between mt-8 mb-8")}
      {...prop}
    >
      {/* stat */}
      <div
        className={cn(
          "relative flex flex-row gap-4 items-center justify-center",
        )}
      >
        <Badge variant="secondary" className={cn("text-sky-600")}>
          {doing} đang làm
        </Badge>
        <Badge variant="secondary" className={cn("text-green-600")}>
          {finish} hoàn thành
        </Badge>
      </div>
      {/* filter */}
      <div className={cn("relative flex flex-row gap-2")}>
        {Object.keys(filterType).map((type, i) => {
          return (
            <Button
              variant={type == filter ? "gardient" : "ghost"}
              className={cn("capitalize hover:bg-green-300")}
              onClick={() => setFilter(type)}
              key={i}
            >
              <Funnel></Funnel>
              {filterType[type]}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
