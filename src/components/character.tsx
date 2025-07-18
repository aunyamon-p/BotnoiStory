import { useState } from "react";
import {
  Box,
  Button,
  FormField,
  MultilineInput,
  Text,
} from "@canva/app-ui-kit";
import { useIntl } from "react-intl";
import "styles/components.css";

/* ---------------------- CharacterInput ---------------------- */
type CharacterInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAddCharacter: () => void;
  label?: string;
};

const CharacterInput = ({
  value,
  onChange,
  onAddCharacter,
  label,
}: CharacterInputProps) => {
  const intl = useIntl();
  const MAX_INPUT_LENGTH = 300;

  return (
    <>
      <FormField 
        label={
          label ||
          intl.formatMessage({
            defaultMessage: "Character",
            description: "Label for character input",
          })
        }
        value={value}
        control={(props) => (
          <MultilineInput
            {...props}
            placeholder={intl.formatMessage({
              defaultMessage: "Type something...",
            })}
            onChange={onChange}
            maxLength={MAX_INPUT_LENGTH}
            minRows={3}
            footer={
              <Box padding="1u" display="flex" justifyContent="end">
                <Text size="small">
                  {value.length}/{MAX_INPUT_LENGTH}
                </Text>
              </Box>
            }
            required
          />
        )}
      />

      <Box display="flex" justifyContent="center" paddingTop="1u">
        <Button
            variant="primary"
            onClick={onAddCharacter}
        >
            {intl.formatMessage({
            defaultMessage: "+ Add character",
            })}
        </Button>
     </Box>
    </>
  );
};

/* ---------------------- CharacterSection ---------------------- */
export const CharacterSection = () => {
  const [characterInputs, setCharacterInputs] = useState<string[]>([""]);
  const [characters, setCharacters] = useState<string[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const updated = [...characterInputs];
    updated[index] = value;
    setCharacterInputs(updated);
  };

  const handleAddCharacter = (index: number) => {
    const newChar = characterInputs[index].trim();
    if (!newChar) return;

    setCharacters((prev) => [...prev, newChar]);
    setCharacterInputs((prev) => [...prev, ""]); // เพิ่มช่องใหม่
  };

  return (
    <Box>
      {characterInputs.map((val, i) => (
        <Box key={i} paddingTop={i === 0 ? undefined : "2u"}>
          <CharacterInput
            value={val}
            onChange={(v) => handleInputChange(i, v)}
            onAddCharacter={() => handleAddCharacter(i)}
            label={`Character ${i + 1}`}
          />
        </Box>
      ))}
    </Box>
  );
};
