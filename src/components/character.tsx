import { useState } from "react";
import {
  Box,
  Button,
  Rows,
  Text,
  PlusIcon,
  TrashIcon,
  MultilineInput,
  FormField,
} from "@canva/app-ui-kit";
import { useIntl } from "react-intl";
import * as styles from "styles/components.css";

const MAX_INPUT_LENGTH = 300;

const toOrdinalText = (n: number): string => {
  const ordinals = [
    "First", "Second", "Third", "Fourth", "Fifth",
    "Sixth", "Seventh", "Eighth", "Ninth", "Tenth",
  ];
  return ordinals[n] || `Character ${n + 1}`;
};

export const CharacterSection = () => {
  const intl = useIntl();
  const [characters, setCharacters] = useState<string[]>([""]);

  const addCharacter = () => {
    setCharacters([...characters, ""]);
  };

  const removeCharacter = (indexToRemove: number) => {
    setCharacters(characters.filter((_, i) => i !== indexToRemove));
  };

  const updateCharacter = (index: number, value: string) => {
    const updated = [...characters];
    updated[index] = value.slice(0, MAX_INPUT_LENGTH);
    setCharacters(updated);
  };

  return (
    <Rows spacing="2u">
      {characters.map((char, index) => (
        <div key={index}>
          <Box
            display="flex"
            justifyContent="spaceBetween"
            alignItems="center"
          >
            <Text variant="bold">
              {intl.formatMessage(
                {
                  defaultMessage: "{ordinal} character",
                  description: "Ordinal label for character",
                },
                { ordinal: toOrdinalText(index) }
              )}
            </Text>
            <Button
              icon={() => <TrashIcon />}
              variant="tertiary"
              onClick={() => removeCharacter(index)}
            />
          </Box>

          <FormField
            label=""
            value={char}
            control={(props) => (
              <MultilineInput
                {...props}
                placeholder={intl.formatMessage({
                  defaultMessage:
                    "A friendly rabbit who likes to seek adventures. He wears a red hat with a magic wand.",
                })}
                onChange={(value) => updateCharacter(index, value)}
                maxLength={MAX_INPUT_LENGTH}
                minRows={4}
                footer={
                  <Box padding="1u" display="flex" justifyContent="end">
                    <Text size="small" tone="secondary">
                      {char.length}/{MAX_INPUT_LENGTH}
                    </Text>
                  </Box>
                }
                required
              />
            )}
          />
        </div>
      ))}

      <Button
        variant="secondary"
        stretch
        onClick={addCharacter}
        icon={() => <PlusIcon />}
      >
        {intl.formatMessage({
          defaultMessage: "Add character",
          description: "Button to add new character",
        })}
      </Button>
    </Rows>
  );
};
