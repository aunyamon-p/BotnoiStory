// home.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Rows } from "@canva/app-ui-kit";
import { Footer } from "./components";
import * as styles from "styles/components.css";
import { AudienceAgeSelect } from "./components";
import { FormatStyleSelect } from "./components";

export const Home = () => {
  const [audienceAge, setAudienceAge] = useState("3-7");
  const [formatStyle, setFormatStyle] = useState("Conversation");

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <AudienceAgeSelect value={audienceAge} onChange={setAudienceAge} />
        <FormatStyleSelect value={formatStyle} onChange={setFormatStyle} />
        <Outlet />
        <Footer />
      </Rows>
    </div>
  );
};
