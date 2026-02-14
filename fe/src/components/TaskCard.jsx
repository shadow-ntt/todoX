import React, { useState, useEffect } from "react";
//icon
import {
  Circle,
  CircleCheck,
  CalendarDays,
  SquarePen,
  Trash2,
} from "lucide-react";

import { Card, CardDescription, CardTitle, CardAction } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

export default function TaskCard({ task, handleChangeTask }) {
  const [isFix, setIsFix] = useState(true);
  const [valueTask, setValueTask] = useState(task.title);
  const [status, setStatus] = useState();

  useEffect(() => {
    setStatus(task.status == "complete");
  }, [task]);
  const handleUpdateTitle = async () => {
    try {
      await api.patch(`/${task._id}/update`, {
        title: valueTask,
      });
      handleChangeTask();
      toast.success("Sửa nhiệm vụ thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi! Không sửa được!");
    }
  };
  const handleUpdateStatus = async () => {
    try {
      setStatus(!status);
      await api.patch(`/${task._id}/update`, {
        status: status ? "active" : "complete",
        completedAt: new Date(),
      });
      handleChangeTask();
      toast.success("Sửa trạng thái nhiệm vụ thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi! Không sửa được trạng thái nhiệm vụ!");
    }
  };
  const handleDelete = async () => {
    try {
      await api.delete(`/${task._id}/delete`, {
        _id: task.id,
      });
      handleChangeTask();
      toast.success("Xóa nhiệm vụ thành công");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi! Không xóa được nhiệm vụ!");
    }
  };
  const handleKeypress = (e) => {
    if (e.key == "Enter") {
      handleUpdateTitle();
      setIsFix(!isFix);
    }
  };
  return (
    <Card className={cn("w-full relative my-3")}>
      <div className={cn("flex flex-row gap-3 px-5 items-center w-full")}>
        {/*check*/}
        <Button
          variant={"ghost"}
          onClick={() => {
            handleUpdateStatus();
          }}
        >
          {status ? (
            <CircleCheck color="#3e9392"></CircleCheck>
          ) : (
            <Circle></Circle>
          )}
        </Button>
        {/* //content */}
        <div className="flex-8">
          {isFix ? (
            <CardTitle>{task.title}</CardTitle>
          ) : (
            <Input
              defaultValue={task.title}
              onChange={(e) => {
                setValueTask(e.target.value);
              }}
              autoFocus
              onKeyPress={handleKeypress}
              onBlur={() => {
                setIsFix(!isFix);
              }}
            ></Input>
          )}

          {/* Date */}
          <CardDescription
            className={cn("flex flex-row items-center justify-start mt-1")}
          >
            <CalendarDays size={12} className={cn("mr-1")} />
            {new Date(task.createdAt).toLocaleString("vi-VN")}
            {task.status == "complete"
              ? `  -${new Date(task?.completedAt).toLocaleString("vi-VN")} `
              : ""}
          </CardDescription>
        </div>

        {/* fix and delete */}
        <div
          className={cn(
            "flex flex-row gap-1 items-center justify-end self-center",
          )}
        >
          <Button
            variant={"ghost"}
            onClick={() => {
              setIsFix(!isFix);
            }}
          >
            <SquarePen size={16} strokeWidth={1.75} />
          </Button>
          <Button
            variant={"ghost"}
            onClick={(e) => {
              handleDelete();
            }}
          >
            <Trash2 size={16} strokeWidth={1.75} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
