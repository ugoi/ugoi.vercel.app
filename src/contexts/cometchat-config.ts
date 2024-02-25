import { UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";

type CometChatConstants = {
  APP_ID: string | undefined;
  REGION: string | undefined;
  AUTH_KEY?: string | undefined;
};

const COMETCHAT_CONSTANTS: CometChatConstants = {
  APP_ID: import.meta.env.VITE_APP_COMETCHAT_APP_ID,
  REGION: import.meta.env.VITE_APP_COMETCHAT_REGION,
};

if (
  !COMETCHAT_CONSTANTS.APP_ID ||
  !COMETCHAT_CONSTANTS.REGION
) {
  throw new Error(
    "CometChat configuration is missing required environment variables."
  );
}

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .subscribePresenceForFriends()
  .build();

export { UIKitSettings };
