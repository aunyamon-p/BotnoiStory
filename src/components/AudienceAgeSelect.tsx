import React from "react";
import { Rows, Select, Text } from "@canva/app-ui-kit";

type AudienceAgeSelectProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export const AudienceAgeSelect = ({ value, onChange }: AudienceAgeSelectProps) => {
  const options = [
    { value: "3-7", label: "3–7 y" },
    { value: "8-12", label: "8–12 y" },
    { value: "13+", label: "13+ y" },
  ];

  return (
    <Rows spacing="1u">
      <Text size="medium">Audience age</Text>
      <Select
        value={value}
        options={options}
        onChange={onChange}
        stretch
      />
    </Rows>
  );
};