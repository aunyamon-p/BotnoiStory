import React from 'react';
import {
  Button,
  Select,
  Box,
  Rows,
  FormField,
  SegmentedControl,
  ReloadIcon
} from "@canva/app-ui-kit";
import { useIntl } from "react-intl";

interface StoryLengthSelectorProps {
  onLengthSelect: (length: '15s' | '30s' | '60s') => void;
  onLanguageSelect: (language: string) => void;
  onCreateStory: () => void;
  onReset: () => void;
  selectedLength?: '15s' | '30s' | '60s';
  selectedLanguage?: string;
}

export const StoryLengthSelector: React.FC<StoryLengthSelectorProps> = ({
  onLengthSelect,
  onLanguageSelect,
  onCreateStory,
  onReset,
  selectedLength = '30s',
  selectedLanguage = 'Thai',
}) => {
  const intl = useIntl();
  return (
    <Box borderRadius="standard">
      <Rows spacing="2u">
        <FormField
          label="Length of story"
          control={() => (
            <SegmentedControl
              value={selectedLength}
              onChange={(val) => onLengthSelect(val as '15s' | '30s' | '60s')}
              options={[
                { value: '15s', label: '~15s' },
                { value: '30s', label: '~30s' },
                { value: '60s', label: '~60s' },
              ]}
             
            />
          )}
        />

        <FormField
          label="Language output"
          control={() => (
            <Select
              value={selectedLanguage}
              onChange={onLanguageSelect}
              options={[
                { value: 'Thai', label: 'Thai' },
                { value: 'English', label: 'English' },
              ]}
              stretch
            />
          )}
        />

        <Rows spacing="1u">
          <Button variant="primary" onClick={onCreateStory} stretch>
            Create story
          </Button>
          <Button 
            icon={() => <ReloadIcon />}
            variant="secondary" 
            onClick={onReset} 
            stretch
          >
            {intl.formatMessage({
            defaultMessage: "Reset"
          })}
          </Button>
        </Rows>
      </Rows>
    </Box>
  );
};
