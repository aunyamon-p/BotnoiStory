import { useState } from "react";
import { Rows, Tabs, Tab, Box, Button, Text, TextInput } from "@canva/app-ui-kit";
import { Footer } from "./components";
import { StoryLengthSelector } from "./components";
import * as styles from "styles/components.css";
import { useIntl, FormattedMessage } from "react-intl";

const CharacterForm = () => {
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
};

const ScriptViewer = ({ 
  onBackToEdit, 
  initialScript = "", 
  onScriptChange 
}: {
  onBackToEdit: () => void;
  initialScript?: string;
  onScriptChange?: (script: string) => void;
}) => {
  const [script, setScript] = useState(initialScript);
  const MAX_CHARS = 1000;

  const handleScriptChange = (value: string) => {
    if (value.length <= MAX_CHARS) {
      setScript(value);
      onScriptChange?.(value);
    }
  };

  return (
    <Box padding="2u">
      <Box>
        <Text variant="bold" size="large">
          Botnoi Story
        </Text>
        <Box paddingTop="1u">
          <Button variant="secondary" onClick={onBackToEdit}>
            Back to edit prompt
          </Button>
        </Box>
      </Box>

      <Box paddingTop="3u">
        <Text variant="bold" size="medium">
          Script
        </Text>
        
        <Box paddingTop="1u">
          <div style={{ 
            border: '1px solid var(--ui-kit-color-border)',
            borderRadius: 'var(--ui-kit-border-radius-medium)',
            padding: 'var(--ui-kit-space-2)',
            minHeight: '200px'
          }}>
            <textarea
              value={script}
              onChange={(e) => handleScriptChange(e.target.value)}
              placeholder="Write your script here..."
              style={{
                width: '100%',
                minHeight: '180px',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                fontSize: 'inherit'
              }}
            />
          </div>
        </Box>

        <Box paddingTop="1u">
          <Text tone={script.length >= MAX_CHARS ? "critical" : "secondary"}>
            {script.length}/{MAX_CHARS}
          </Text>
          {script.length >= MAX_CHARS && (
            <Text tone="critical">Character limit reached</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export const Home = () => {
  const [selectedLength, setSelectedLength] = useState<'15s' | '30s' | '60s'>('30s');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Thai');
  const [activeTab, setActiveTab] = useState<'create' | 'script'>('create');
  const [scriptContent, setScriptContent] = useState("");

  const handleLengthSelect = (length: '15s' | '30s' | '60s') => {
    setSelectedLength(length);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleCreateStory = () => {
    console.log("Create story with:", selectedLength, selectedLanguage);
    setActiveTab('script');
  };

  const handleReset = () => {
    setSelectedLength('30s');
    setSelectedLanguage('Thai');
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <Tabs>
          <Tab
            active={activeTab === 'create'}
            id="create"
            onClick={() => setActiveTab('create')}
          >
            Create Story
          </Tab>
          <Tab
            active={activeTab === 'script'}
            id="script"
            onClick={() => setActiveTab('script')}
          >
            Script View
          </Tab>
        </Tabs>

        {activeTab === 'create' && (
          <Box>
            <StoryLengthSelector
              onLengthSelect={handleLengthSelect}
              onLanguageSelect={handleLanguageSelect}
              onCreateStory={handleCreateStory}
              onReset={handleReset}
              selectedLength={selectedLength}
              selectedLanguage={selectedLanguage}
            />
            <CharacterForm />
          </Box>
        )}

        {activeTab === 'script' && (
          <ScriptViewer 
            onBackToEdit={() => setActiveTab('create')}
            initialScript={scriptContent}
            onScriptChange={setScriptContent}
          />
        )}

        <Footer />
      </Rows>
    </div>
  );
};