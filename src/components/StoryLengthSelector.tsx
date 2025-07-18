import React from 'react';
import { Button, Text, Select, Box, Columns, Rows } from "@canva/app-ui-kit";

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
  selectedLength,
  selectedLanguage = 'Thai',
}) => {
  return (
    <Box background="neutralLow" borderRadius="standard" padding="2u">
      <Rows spacing="3u">
        <Box>
          <Text variant="bold">Length of story</Text>
          <Columns spacing="1u">
            <Button
              variant={selectedLength === '15s' ? 'primary' : 'secondary'}
              onClick={() => onLengthSelect('15s')}
              stretch
            >
              ~15s
            </Button>
            <Button
              variant={selectedLength === '30s' ? 'primary' : 'secondary'}
              onClick={() => onLengthSelect('30s')}
              stretch
            >
              ~30s
            </Button>
            <Button
              variant={selectedLength === '60s' ? 'primary' : 'secondary'}
              onClick={() => onLengthSelect('60s')}
              stretch
            >
              ~60s
            </Button>
          </Columns>
        </Box>

        <Box>
          <Text variant="bold" size="small">Language output</Text>
          <Select
            value={selectedLanguage}
            onChange={onLanguageSelect}
            options={[
              { value: 'Thai', label: 'Thai' },
              { value: 'English', label: 'English' },
              // เพิ่มภาษาอื่นๆ ได้ที่นี่
            ]}
            stretch
          />
        </Box>

        <Rows spacing="1u">
          <Button variant="primary" onClick={onCreateStory} stretch>
            Create story
          </Button>
          <Button variant="secondary" onClick={onReset} stretch>
            Reset input
          </Button>
        </Rows>
      </Rows>
    </Box>
  );
};
