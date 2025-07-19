import { useState,useRef } from "react";
import { Rows, Box } from "@canva/app-ui-kit";
import { Footer, SelectSpeaker, StoryLengthSelector } from "./components";
import * as styles from "styles/components.css";
import { ScriptViewer } from "./components";
import { Outlet } from "react-router-dom";
import { CharacterSection } from "./components";

export const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null); 
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
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedLength('30s');
    setSelectedLanguage('Thai');
  };

  return (
    <div ref={scrollRef} className={styles.scrollContainer}>
      <Rows spacing="2u">
        {activeTab === 'create' && (
          <Rows spacing="2u">
            {/* เดิมอยู่ข้างนอก ย้ายเข้ามาเพื่อไม่ให้ขึ้นใน Script */}
            <Outlet />
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
        )}

        {activeTab === 'script' && (
          <Rows spacing="2u">
          <ScriptViewer
            onBackToEdit={() => setActiveTab('create')}
            initialScript={scriptContent}
            onScriptChange={setScriptContent}
          />
          <SelectSpeaker/>
          </Rows>
        )}
        <Footer />
      </Rows>
    </div>
  );
};