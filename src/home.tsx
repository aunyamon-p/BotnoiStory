import { useState } from "react";
import { Rows, Tabs, Tab, Box } from "@canva/app-ui-kit";
import { StoryLengthSelector } from "./components";
import * as styles from "styles/components.css";
import { useIntl } from "react-intl";
import { ScriptViewer } from "./components"; // ปรับ path ให้ตรงไฟล์จริง
import { Outlet } from "react-router-dom";
import { CharacterSection } from "./components/character";

export const Home = () => {
  const [selectedLength, setSelectedLength] = useState<'15s' | '30s' | '60s'>('30s');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Thai');
  const [activeTab, setActiveTab] = useState<'create' | 'script'>('create');
  const [scriptContent, setScriptContent] = useState("");
  const intl = useIntl(); // ยังใช้อยู่ไหม? ถ้าไม่ใช้ ลบได้

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
        {/* Tabs */}
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
          </Box>
        )}

        {activeTab === 'script' && (
          <ScriptViewer
            onBackToEdit={() => setActiveTab('create')}
            initialScript={scriptContent}
            onScriptChange={setScriptContent}
          />
        )}
      </Rows>
    </div>
  );
};
