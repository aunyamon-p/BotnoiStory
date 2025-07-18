import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormField,
  MultilineInput,
  Text,
} from "@canva/app-ui-kit";
import { useAppContext } from "src/context";
import { Paths } from "src/routes";
import { PromptInputMessages as Messages } from "./prompt_input.messages";
import { useIntl } from "react-intl";

// @TODO: Adjust according to your specific requirements.
const MAX_INPUT_LENGTH = 200;
const MIN_INPUT_ROWS = 3;

/**
 * Array of example prompts that could be used to generate interesting pictures with an AI.
 * Consider fetching these prompts from a server or API call for dynamic and varied content.
 * These would need to be localised, but that is left out here as the method would depend on
 * the specific implementation or API used.
 */
const examplePrompts: string[] = [
  "Sharing is caring",
  "Kindness can change the world",
  "Honesty is the best policy",
  "Courage conquers fear",
  "Friendship is a treasure",
  "Hard work leads to success",
  "Believe in yourself",
  "Helping others brings happiness",
  "Patience is a virtue",
  "Teamwork makes the dream work",
  "Never judge by appearances",
  "Be grateful for what you have",
  "Love conquers all",
  "Learning from mistakes",
  "Bravery in the face of challenges",
  "The power of forgiveness",
  "Respect nature and all living things",
  "Small acts of kindness matter",
  "Hope shines in the darkest times",
  "Dream big and never give up",
];

/**
 * Generates a new example prompt different from the current prompt.
 * @param {string} currentPrompt - The current prompt.
 * @returns {string} A new example prompt different from the current prompt.
 */
const generateExamplePrompt = (currentPrompt: string): string => {
  let newPrompt = currentPrompt;

  // Prevents generating the same prompt twice in a row.
  let attempts = 0;
  // Maximum attempts to generate a new prompt. Used as a safeguard against infinite loops.
  const MAX_ATTEMPTS = 3;

  while (currentPrompt === newPrompt && attempts < MAX_ATTEMPTS) {
    newPrompt =
      examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    attempts++;
  }

  return newPrompt;
};

export const PromptInput = () => {
  const intl = useIntl();
  const { pathname } = useLocation();
  const isHomeRoute = pathname === Paths.HOME;
  const { promptInput, setPromptInput, promptInputError } = useAppContext();
  const [hasUsedInspire, setHasUsedInspire] = useState(false);

  const onInspireClick = () => {
    setPromptInput(generateExamplePrompt(promptInput));
    setHasUsedInspire(true);
  };

  const onPromptInputChange = (value: string) => {
    setPromptInput(value);

  };

  const InspireMeButton = () => {
    return (
      <Button variant="secondary" onClick={onInspireClick}>
        {hasUsedInspire
          ? intl.formatMessage(Messages.promptTryAnother)
          : intl.formatMessage(Messages.promptInspireMe)}
      </Button>
    );
  };

  const onClearClick = () => {
    setPromptInput("");
    setHasUsedInspire(false);
  };

  const ClearButton = () => (
    <Button variant="tertiary" onClick={onClearClick} >
      {intl.formatMessage({
        defaultMessage: "Clear",
        description:
          "A button label to remove all contents of the prompt input field",
      })}
    </Button>
  );

  return (
    <FormField
      label={intl.formatMessage({
        defaultMessage: "Moral of the story",
        description:
          "Label for the input field where users enter the moral lesson or main message of their story",
      })}
      error={promptInputError}
      value={promptInput}
      control={(props) => (
        <MultilineInput
          {...props}
          placeholder={intl.formatMessage({
            defaultMessage: "Type the moral lesson of story. For example, sharing is caring",
            description:
              "Placeholder text encouraging users to type the moral lesson or key message from the story they want to create. This helps guide users to provide meaningful input for story generation.",
          })}
          onChange={onPromptInputChange}
          maxLength={MAX_INPUT_LENGTH}
          minRows={MIN_INPUT_ROWS}
          footer={
            <Box
              padding="1u"
              display="flex"
              justifyContent="spaceBetween"
              alignItems="end"
            >
              {/* Left: Inspire me button */}
              {isHomeRoute && <InspireMeButton />}

              {/* Right: counter above Clear button */}
              <Box display="flex" flexDirection="column" alignItems="end">
                <Box paddingBottom="0.5u">
                  <Text size="small">
                    {promptInput.length}/{MAX_INPUT_LENGTH}
                  </Text>
                </Box>
                <ClearButton />
              </Box>
            </Box>
          }
          required={true}
        />
      )}
    />
  );
};
