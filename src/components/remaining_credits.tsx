import { Link, Rows, Text, TextPlaceholder } from "@canva/app-ui-kit";
import { requestOpenExternalUrl } from "@canva/platform";
import { useAppContext } from "src/context";
import { FormattedMessage, useIntl } from "react-intl";


export const RemainingCredits = (): JSX.Element | undefined => {
  const { remainingCredits, loadingApp } = useAppContext();

  const RemainingCreditsText = () => {
    if (loadingApp) {
      return <TextPlaceholder size="small" />;
    }

    return (
      <Text alignment="center" size="small">
        {remainingCredits > 0 ? (
           <FormattedMessage
            defaultMessage="<strong>Use 1 of {remainingCredits, number} {remainingCredits, plural, one {credit} other {Botnoi points}}.</strong>"
            description="A message to indicate the number of credits, of their total remaining credits, that will be used when generating an image"
            values={{
              remainingCredits,
              strong: (chunks) => <strong>{chunks}</strong>,
            }}
          />
        ) : (
          <FormattedMessage
            defaultMessage="No points remaining."
            description="A message to indicate that there are no credits available to be used"
          />
        )}
      </Text>
    );
  };

  const openExternalUrl = async (url: string) => {
    await requestOpenExternalUrl({
      url,
    });
  };

  const intl = useIntl();

  return (
    <Rows spacing="0">
      <RemainingCreditsText />
      <Text alignment="center" size="small">
        <FormattedMessage defaultMessage="Points are used for generating text and audio."/>
        <br/>
        <FormattedMessage defaultMessage="Each character in generated audio uses 1 point."/>
      </Text>
    </Rows>
  );
};
