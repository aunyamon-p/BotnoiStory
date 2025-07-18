import { useState } from "react";
import { 
  Box,
  Button,
  Text,
  TextInput,
  FormField
} from "@canva/app-ui-kit";
import * as styles from "styles/components.css";
import { useIntl } from "react-intl";

interface ScriptViewerProps {
  onBackToEdit: () => void;
  initialScript?: string;
  onScriptChange?: (script: string) => void;
}

export const ScriptViewer = ({ 
  onBackToEdit, 
  initialScript = "", 
  onScriptChange 
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
    <div className={styles.scrollContainer}>
      <Box padding="2u">
        {/* Header - ตัวใหญ่เหมือนตัวอย่าง */}
        <Text variant="bold" size="large" alignment="start">
          Script
        </Text>

        {/* Script Input - ปรับขนาดตัวอักษรให้ใหญ่ชัดเจน */}
        <Box paddingTop="1u">
          <div style={{ fontSize: '1.3rem' }}> {/* ตัวใหญ่ขึ้น 10% */}
            <TextInput
              placeholder={intl.formatMessage({
                defaultMessage: "Type your script here...",
                description: "Placeholder for script input"
              })}
              value={script}
              onChange={handleScriptChange}
            />
          </div>
          
          {/* Character counter */}
          <Box paddingTop="1u">
            <Text variant="regular" tone="tertiary" size="small">
              {script.length}/{MAX_CHARS} characters
            </Text>
          </Box>
        </Box>

        {/* Back Button */}
        <Box paddingTop="2u">
          <Button 
            variant="secondary" 
            onClick={onBackToEdit}
            stretch
          >
            {intl.formatMessage({
              defaultMessage: "Back to edit",
              description: "Back button text"
            })}
          </Button>
        </Box>
      </Box>
    </div>
  );
};