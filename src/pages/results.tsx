import { Rows } from "@canva/app-ui-kit";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import {
  AppError,
  LoadingResults,
  ScriptViewer,
  SelectSpeaker
} from "src/components";
import { useAppContext } from "src/context";
import { EXPECTED_LOADING_TIME_IN_SECONDS } from "src/config";

export const ResultsPage = () => {
  const [scriptContent, setScriptContent] = useState("");
  const navigate = useNavigate();
  
  const handleBackbtn = () => {
    navigate("/");
  };

  return (
    <Rows spacing="1u">
      <AppError />
      <Rows spacing="2u">
        <ScriptViewer
            onBackToEdit={handleBackbtn}
            initialScript={scriptContent}
            onScriptChange={setScriptContent}
          />
        <SelectSpeaker />
      </Rows>
    </Rows>
  );
};
