import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilter from "@/components/StatsAndFilters";
import TaskCard from "@/components/TaskCard";
import DateTimeFilter from "@/components/DateTimeFilter";
import TaskPanination from "@/components/TaskPanination";

import { toast } from "sonner";
import { Toaster } from "sonner";

import { lengthTaskCard } from "@/lib/data";
import api from "@/lib/api";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useEffect } from "react";
import { data } from "react-router-dom";

export function HomePage() {
  const [filter, setFilter] = useState("all");
  const [listTasks, setListTasks] = useState([]);
  const [completeCount, setCompleteCount] = useState();
  const [activeCount, settActiveCount] = useState();
  const [filterDate, setFilterDate] = useState("");
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`?filterDate=${filterDate}`);
      setListTasks(res.data.tasks);
      setCompleteCount(res.data.completeCount);
      settActiveCount(res.data.activeCount);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi! Không lấy được dữ liệu");
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [filterDate]);

  useEffect(() => {
    setPage(1);
  }, [filter, filterDate]);

  const taskFiltered = listTasks.filter((task, index) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const taskVisible = taskFiltered.slice(
    lengthTaskCard * (page - 1),
    lengthTaskCard * page,
  );
  const lengthPage = Math.ceil(taskFiltered.length / lengthTaskCard);
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "white",
          },
        }}
      />
      {/* {patterncraft.fun} */}
      <div className="min-h-screen w-full relative bg-white">
        {/* Soft Green Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(circle at center, #8FFFB0, transparent)
      `,
          }}
        />
        {/* Your Content/Components */}
        <div className={cn("container")}>
          <div className={cn("mt-10 w-full")}>
            <Header></Header>
            <AddTask handleChangeTask={fetchTasks}></AddTask>
            <StatsAndFilter
              filter={filter}
              setFilter={setFilter}
              doing={activeCount}
              finish={completeCount}
            ></StatsAndFilter>
            {/* list task */}
            {taskVisible.map((t, i) => {
              return (
                <TaskCard
                  task={t}
                  key={i}
                  handleChangeTask={fetchTasks}
                ></TaskCard>
              );
            })}
          </div>

          {/* Panination filterDate0 */}
          <div className={cn("justify-between flex item-center")}>
            <TaskPanination
              page={page}
              setPage={setPage}
              lengthPage={lengthPage}
            ></TaskPanination>
            <DateTimeFilter handleChangeTask={setFilterDate}></DateTimeFilter>
          </div>
        </div>
      </div>
    </>
  );
}
