import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import React from "react";
import { options } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function DateTimeFilter({ handleChangeTask }) {
  const handleChange = (value) => {
    handleChangeTask(value.value);
  };
  return (
    <>
      <Combobox
        items={options}
        onValueChange={handleChange}
        className={cn("bg-red-500 mb-8 ")}
        defaultValue={options[3]}
      >
        <ComboboxInput
          placeholder="chọn thời gian lọc"
          className={cn("bg-white shadow-lg  ")}
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
