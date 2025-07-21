import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "src/context";
import { Box, Rows } from "@canva/app-ui-kit";
import {
  AppError,
  PromptInput,
  CharacterSection,
  StoryLengthSelector,
  AudienceAgeSelect,
  FormatStyleSelect
} from "src/components";

export const CreateStoryPage = () => {
  const navigate = useNavigate();
  const [selectedLength, setSelectedLength] = useState<"15s" | "30s" | "60s">("30s");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Thai");
  const { setPromptInput } = useAppContext();

  const handleLengthSelect = (length: "15s" | "30s" | "60s") => {
    setSelectedLength(length);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleCreateStory = () => {
    // scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/results");
  };
  
  const handleReset = () => {
    setPromptInput("");
    setSelectedLength("30s");
    setSelectedLanguage("Thai");
  };

  const [audienceAge, setAudienceAge] = useState("3-7");
  const [formatStyle, setFormatStyle] = useState("Conversation");

  return (
    <Box paddingTop="1u">
      <Rows spacing="2u">
        <AppError />
        <PromptInput />
        <FormatStyleSelect value={formatStyle} onChange={setFormatStyle} />
        <AudienceAgeSelect value={audienceAge} onChange={setAudienceAge} />
        <CharacterSection />
        <StoryLengthSelector
          onLengthSelect={handleLengthSelect}
          onLanguageSelect={handleLanguageSelect}
          onCreateStory={handleCreateStory}
          onReset={handleReset}
          selectedLength={selectedLength}
          selectedLanguage={selectedLanguage}
        />
        </Rows>
      </Box>
  );
};
