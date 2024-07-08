import { SelectInterface } from "@/interfaces/common";
import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "grumpy", label: "Grumpy" },
  { value: "poet", label: "Poet" },
];

export const SelectDropDown = () => {
  const [selectedOption, setSelectedOption] = useState<SelectInterface | null>({
    value: "grumpy",
    label: "Grumpy",
  });

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={(option: SelectInterface | null) => setSelectedOption(option)}
        options={options}
      />
    </div>
  );
};
