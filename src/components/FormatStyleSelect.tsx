import React from "react";
import { Rows, Select, Text } from "@canva/app-ui-kit";

type FormatStyleSelectProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export const FormatStyleSelect = ({ value, onChange }: FormatStyleSelectProps) => {
  const options = [
    { value: "Conversation", label: "Conversation" },
    { value: "Narrative", label: "Narrative" },
    { value: "Poem", label: "Poem" },
  ];

  return (
  <Rows spacing="1u">
      <Text size="medium" variant="bold">
        Format style
      </Text>
      <div style={{ width: "100%" }}>
        <Select
          value={value}
          options={options}
          onChange={onChange}
          stretch
        />
      </div>
    </Rows>
  );
};
