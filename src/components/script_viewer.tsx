import { useState } from "react";
import {
  Box,
  Button,
  Text,
  FormField,
  MultilineInput,
  Column,
} from "@canva/app-ui-kit";
import { useIntl } from "react-intl";


interface ScriptViewerProps {
  onBackToEdit: () => void;
  initialScript?: string;
  onScriptChange?: (script: string) => void;
}


export const ScriptViewer = ({
  onBackToEdit,
  initialScript = "",
  onScriptChange,
}: ScriptViewerProps) => {
  const [script, setScript] = useState(initialScript);
  const MAX_CHARS = 1000;
  const intl = useIntl();

  const handleScriptChange = (value: string) => {
    if (value.length <= MAX_CHARS) {
      setScript(value);
      onScriptChange?.(value);
    }
  };

  return (
    <>
          {/* Back Button */}
      <Column>
        <Button
          variant="tertiary"
          onClick={onBackToEdit}
        >
          ←
        </Button>
        
        <Button
          variant="tertiary"
          onClick={onBackToEdit}
        >
          {intl.formatMessage({
            defaultMessage: "Back to edit prompt",
            description: "Back button text",
          })}
        </Button>
      </Column>

      <FormField
        label={intl.formatMessage({
          defaultMessage: "Script",
          description: "Label for script input field",
        })}
        value={script}
        control={(props) => (
          <MultilineInput
            {...props}
            placeholder={intl.formatMessage({
              defaultMessage: "Type your script here...",
              description: "Placeholder for script input",
            })}
            onChange={handleScriptChange}
            minRows={6} // ✅ ให้ดูเหมือน text editor
            maxLength={MAX_CHARS}
            footer={
              <Box padding="1u" display="flex" justifyContent="end">
                <Text size="small" >
                  {script.length}/{MAX_CHARS}
                </Text>
              </Box>
            }
          />
        )}
      />



    </>
  );
};
