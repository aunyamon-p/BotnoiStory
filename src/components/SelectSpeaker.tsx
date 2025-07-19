import { useState } from "react";
import {
  Box,
  Select,
  AudioCard,
  Text,
  AudioContextProvider
} from "@canva/app-ui-kit";
import { useIntl } from "react-intl";

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
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | undefined>(undefined);
  const intl = useIntl();

  const handleSelect = (value: string) => {
    setSelectedSpeakerId(value);
  };

  const speakerOptions = sampleSpeakers.map((speaker) => ({
    value: speaker.id,
    label: speaker.name}));

  const selectedSpeaker = sampleSpeakers.find(speaker => speaker.id === selectedSpeakerId);

  return (
    <Box padding="2u" background="neutralLow" borderRadius="standard">
      <Text variant="bold" size="small">Select a Speaker</Text>
      <Select
        options={speakerOptions}
        value={selectedSpeakerId}
        onChange={handleSelect}
        placeholder="Choose a speaker..."
        stretch
      />

      <AudioContextProvider>
      {selectedSpeaker && (
        <Box paddingTop="2u">
          <AudioCard
            audioPreviewUrl={selectedSpeaker.sampleAudioUrl}
            title={`${selectedSpeaker.name} ${selectedSpeaker.premium ? 'Premium' : ''}`}
            description={`${selectedSpeaker.gender} - ${selectedSpeaker.description}`}
            thumbnailUrl={selectedSpeaker.imageUrl}
            ariaLabel={`Audio preview for ${selectedSpeaker.name}`}
            durationInSeconds={86}
          />
        </Box>
      )}
      </AudioContextProvider>
    </Box>
  );
};
