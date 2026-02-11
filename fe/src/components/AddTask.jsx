//gõ nhanh: rfc
import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { cn } from "@/lib/utils";

import api from "@/lib/api";
import { data } from "react-router-dom";
import { useState } from "react";

export default function AddTask({ handleChangeTask }) {
  const [valueTask, setValueTask] = useState("");

  const handleAddTask = async (title) => {
    try {
      api.post("/add", {
        title: title,
      });
      handleChangeTask();
      toast.success("Thêm thành công");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi! Không thêm được");
    }
  };
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center w-full p-7 gap-2 bg-card rounded-md mt-10   shadow-lg",
      )}
    >
      <Input
        type="email"
        placeholder="Email"
        className={cn("shadow-lg")}
        onChange={(e) => setValueTask(e.target.value)}
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            handleAddTask(valueTask);
          }
        }}
      />
      <Button
        variant="outline"
        className={cn("shadow-lg")}
        onClick={(e) => {
          handleAddTask(valueTask);
        }}
      >
        Thêm
      </Button>
    </div>
  );
}
