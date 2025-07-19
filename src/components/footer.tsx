import { useNavigate, useLocation} from "react-router-dom";
import { useState } from "react";
import { Rows,Button,Text,CopyIcon,Box } from "@canva/app-ui-kit";
import { requestOpenExternalUrl } from "@canva/platform";
import { purchaseCredits } from "src/api";
import { RemainingCredits } from "src/components";
import { useAppContext } from "src/context";
import { Paths } from "src/routes";
import { useIntl } from "react-intl";
import { FooterMessages as Messages } from "./footer.messages";


export const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRootRoute = pathname === Paths.HOME;
  const {
    setPromptInput,
    setPromptInputError,
    loadingApp,
    remainingCredits,
    setRemainingCredits,
  } = useAppContext();
  const intl = useIntl();

  const PURCHASE_URL = "https://voice.botnoi.ai/";

  const hasRemainingCredits = remainingCredits > 0;

  const isCreditRemaining = () => {
    if (!hasRemainingCredits) {
      setPromptInputError(
        intl.formatMessage(Messages.promptNoCreditsRemaining),
      );
      return false;
    }
    return true;
  };

  const onPurchaseMoreCredits = async () => {
    const { credits } = await purchaseCredits();
    setRemainingCredits(credits);
  };

  const reset = () => {
    setPromptInput("");
    navigate(Paths.HOME);
  };

  const footerButtons = [
    {
      variant: "secondary" as const,
      // onClick: onPurchaseMoreCredits,
      onClick: () => openExternalUrl(PURCHASE_URL),
      value: intl.formatMessage(Messages.purchaseMoreCredits),
      visible: isRootRoute,
    }
  ];

  //ต้องดึงมาจาก Botnoi Account
  const userId = "VWNlNDgyYjczZTJhZGQ1MWJiODE2YzhlNzExYTdhZTA1NTYxODk0"
  const [copied, setCopied] = useState(false);
  const copyUserId = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    }catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleCopy = async () => {
    await copyUserId(userId);
    setCopied(true);
    setTimeout(() => setCopied(false),1500);
  };


  const openExternalUrl = async (url: string) => {
    await requestOpenExternalUrl({
      url,
    });
  };
  
  return (
    <Rows spacing="1u">
      <RemainingCredits />
      {footerButtons.map(
        ({ visible, variant, onClick, value }) =>
          visible && (
            <Button
              key={value}
              variant={variant}
              onClick={onClick}
              loading={loadingApp}
              stretch={true}
            >
              {value}
            </Button>
          ),
      )}
      <Box paddingTop="2u">
        <Rows spacing="1u">
        <Text size="small" alignment="center" >
            {intl.formatMessage(Messages.userID)}: {userId.length > 19 ? `${userId.slice(0, 19)}...` : userId}
        </Text>
        <Button
          variant="tertiary"
          onClick={handleCopy}
          stretch={false}
          icon={() => <CopyIcon />}
          >
          {copied ? "Copied UID" : "Copy UID"}
        </Button>
        </Rows>
        </Box>
    </Rows>
  );
};
