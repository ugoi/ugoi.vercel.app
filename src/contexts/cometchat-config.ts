import { CometChat } from "@cometchat/chat-sdk-javascript";
import { UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";

type CometChatConstants = {
  APP_ID: string | undefined;
  REGION: string | undefined;
  AUTH_KEY: string | undefined;
};

const COMETCHAT_CONSTANTS: CometChatConstants = {
  APP_ID: import.meta.env.VITE_APP_COMETCHAT_APP_ID,
  REGION: import.meta.env.VITE_APP_COMETCHAT_REGION,
  AUTH_KEY: import.meta.env.VITE_APP_COMETCHAT_AUTH_KEY,
};

if (
  !COMETCHAT_CONSTANTS.APP_ID ||
  !COMETCHAT_CONSTANTS.REGION ||
  !COMETCHAT_CONSTANTS.AUTH_KEY
) {
  throw new Error(
    "CometChat configuration is missing required environment variables."
  );
}

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

const usersRequestBuilder = new CometChat.UsersRequestBuilder()
  .setLimit(30)
  .setRoles(["default"]);

export { UIKitSettings };
