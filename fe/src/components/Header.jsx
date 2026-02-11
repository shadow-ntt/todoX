import React from "react";

import { cn } from "@/lib/utils";
export default function () {
  return (
    <div className={cn("w-full flex flex-col items-center justify-center")}>
      <h1 className={cn("font-bold text-3xl text-cyan-600 mb-2")}>TodoX</h1>
      <p className={cn("tracking-wide")}>
        Không có việc gì khó, chỉ sợ quá khó
      </p>
    </div>
  );
}
