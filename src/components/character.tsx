import React, { useState } from "react";
import { Button, Text, TextInput, Box } from "@canva/app-ui-kit";
import { useIntl, FormattedMessage } from "react-intl";

export default function CharacterForm() {
  const [characters, setCharacters] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const intl = useIntl();

  const addCharacter = () => {
    if (input.trim() && input.length <= 300) {
      setCharacters([...characters, input.trim()]);
      setInput("");
    }
  };

  return (
    <Box padding="2u">
      <Text variant="regular">
        <FormattedMessage
          defaultMessage="Describe your character"
          description="Prompt for user to describe their character"
        />
      </Text>

      <TextInput
        placeholder={intl.formatMessage({
          defaultMessage: "Type something...",
          description: "Placeholder text for character description input",
        })}
        value={input}
        onChange={(value: string) => setInput(value)}
      />

      <Text variant="regular" tone="secondary">
        <FormattedMessage
          defaultMessage="{currentLength}/300 characters"
          description="Shows the current character count out of 300"
          values={{ currentLength: input.length }}
        />
      </Text>

      <Button
        variant="primary"
        stretch
        onClick={addCharacter}
        disabled={input.trim().length === 0}
      >
        {/* แก้ไขให้ใช้ intl.formatMessage เพื่อคืนค่าเป็น string สำหรับ children ของ Button */}
        {intl.formatMessage({
          defaultMessage: "Add character",
          description: "Button to add a character",
        })}
      </Button>

      {characters.length > 0 && (
        <Box padding="2u">
          <Text variant="bold">
            <FormattedMessage
              defaultMessage="Added characters:"
              description="Heading for the list of added characters"
            />
          </Text>
          {characters.map((char, i) => (
            <Box
              key={i}
              padding="1u"
              borderRadius="standard"
              background="neutralLow"
            >
              <Text>{char}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}