import { useState } from "react";
import {
  Box,
  Select,
  AudioCard,
  Text,
  AudioContextProvider,
  Rows,
  Button,
  ReloadIcon
} from "@canva/app-ui-kit";
import { useIntl } from "react-intl";
import { useAppContext } from "src/context";
import { useNavigate } from "react-router-dom";
import { Paths } from "src/routes";

interface Speaker {
  id: string;
  name: string;
  premium?: boolean;
  gender: "Male" | "Female";
  description: string;
  imageUrl: string;
  sampleAudioUrl: string;
}

const sampleSpeakers: Speaker[] = [
  {
    id: "1",
    name: "Ava",
    premium: true,
    gender: "Female",
    description: "Story telling",
    imageUrl: "https://www.canva.dev/example-assets/image-import/grass-image-thumbnail.jpg",
    sampleAudioUrl: "https://www.canva.dev/example-assets/audio-import/audio.mp3",
  },
  {
    id: "2",
    name: "James",
    premium: false,
    gender: "Male",
    description: "Professional narration",
    imageUrl: "https://www.canva.dev/example-assets/image-import/grass-image-thumbnail.jpg",
    sampleAudioUrl: "https://www.canva.dev/example-assets/audio-import/audio.mp3",
  },
  {
    id: "3",
    name: "Emma",
    premium: true,
    gender: "Female",
    description: "Calm and soothing",
    imageUrl: "https://www.canva.dev/example-assets/image-import/grass-image-thumbnail.jpg",
    sampleAudioUrl: "https://www.canva.dev/example-assets/audio-import/audio.mp3",
  }
];

export const SelectSpeaker = () => {
  const navigate = useNavigate();
  const { setPromptInput } = useAppContext();
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | undefined>(undefined);
  const intl = useIntl();

  const handleSelect = (value: string) => {
    setSelectedSpeakerId(value);
  };

  const speakerOptions = sampleSpeakers.map((speaker) => ({
    value: speaker.id,
    label: speaker.name}));

  const selectedSpeaker = sampleSpeakers.find(speaker => speaker.id === selectedSpeakerId);

  const handleAddVoiceOver = () => {
    if (selectedSpeaker) {
      console.log(`Adding voice over with speaker: ${selectedSpeaker.name}`);
      // Logic to add voice over to design
    }
  };

  const handleStartNewStory = () => {
    setPromptInput("");
    navigate(Paths.HOME);
  };

  return (
    <Rows spacing="1u">
      <Text variant="bold">Select a Speaker</Text>
      <Select
        options={speakerOptions}
        value={selectedSpeakerId}
        onChange={handleSelect}
        placeholder="Choose a speaker..."
        stretch
      />

      <AudioContextProvider>
      {selectedSpeaker && (
        <Rows spacing="2u">
          <AudioCard
            audioPreviewUrl={selectedSpeaker.sampleAudioUrl}
            title={`${selectedSpeaker.name} ${selectedSpeaker.premium ? 'Premium' : ''}`}
            description={`${selectedSpeaker.gender} - ${selectedSpeaker.description}`}
            thumbnailUrl={selectedSpeaker.imageUrl}
            ariaLabel={`Audio preview for ${selectedSpeaker.name}`}
            durationInSeconds={86}
          />
        </Rows>
      )}
      </AudioContextProvider>

      <Box paddingTop="1u">
        <Rows spacing="1u">
          <Button 
          variant="primary" 
          onClick={handleAddVoiceOver} 
          disabled={!selectedSpeakerId}
          stretch
          >
            Add voice over to design 
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleStartNewStory} 
            stretch
            >  
            {intl.formatMessage({
            defaultMessage: "Start new story",
            })}
          </Button>
        </Rows>
      </Box>
    </Rows>
);
};
