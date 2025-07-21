import { useState, useRef } from "react";
import {
  Box,
  Select,
  Text,
  Rows,
  Button,
  PlayFilledIcon,
  PauseIcon,
  Column,
  Columns
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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intl = useIntl();

  const handleSelect = (value: string) => {
    // หยุดเสียงเก่าถ้ามี
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
    setSelectedSpeakerId(value);
  };

  const speakerOptions = sampleSpeakers.map((speaker) => ({
    value: speaker.id,
    label: speaker.name
  }));

  const selectedSpeaker = sampleSpeakers.find(speaker => speaker.id === selectedSpeakerId);

  const handleAddVoiceOver = () => {
    if (selectedSpeaker) {
      console.log(`Adding voice over with speaker: ${selectedSpeaker.name}`);
    }
  };

  const handleStartNewStory = () => {
    setPromptInput("");
    navigate(Paths.HOME);
  };

  const toggleAudio = () => {
    if (!selectedSpeaker?.sampleAudioUrl) return;

    if (isPlaying && audioRef.current) {
      // หยุดเสียง
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    } else {
      // เล่นเสียง
      const audio = new Audio(selectedSpeaker.sampleAudioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };

      audio.play();
      setIsPlaying(true);
    }
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

      {selectedSpeaker && (
        <div style={{ border: "2px solid #9E77F3", borderRadius: "8px", padding: "8px" }}>
        <Rows spacing="0">
          <Columns spacing="2u" alignY="center">
            {/* รูปภาพ */}
            <Column width="content">
              <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={selectedSpeaker.imageUrl}
                alt={selectedSpeaker.name}
                style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover" }}
              />
              </div>
            </Column>

            {/* ข้อความ */}
            <Column>
              <Rows spacing="0">
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <Text>
                <strong>{selectedSpeaker.name}</strong>
              </Text>
              {selectedSpeaker.premium && (
                <Text size="small" tone="tertiary">Premium</Text>
              )}
            </div>
                <Text size="small" tone="tertiary">
                  {selectedSpeaker.gender} - {selectedSpeaker.description}
                </Text>
              </Rows>
            </Column>

            {/* ปุ่มเล่น/หยุดเสียง */}
            <Column width="content">
              <div style={{ 
                borderRadius: "50%", 
                overflow: "hidden",
                display: "inline-block",
                width: "fit-content",
                height: "fit-content"
              }}>
                <Button
                  icon={isPlaying ? PauseIcon : PlayFilledIcon}
                  ariaLabel={isPlaying ? `Pause audio for ${selectedSpeaker.name}` : `Play audio for ${selectedSpeaker.name}`}
                  onClick={toggleAudio}
                  variant="tertiary"
                  pressed={true}
                />
              </div>
            </Column>
          </Columns>
        </Rows>
        </div>
      )}

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