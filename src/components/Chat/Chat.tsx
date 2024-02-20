import React, { useEffect, useState } from "react";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
  UsersConfiguration,
} from "@cometchat/chat-uikit-react";
import { CometChatUsersWithMessages } from "@cometchat/chat-uikit-react"; //import the component in your App.js file
import { CometChat } from "@cometchat/chat-sdk-javascript";

type CometChatConstants = {
  APP_ID: string | undefined;
  REGION: string | undefined;
  AUTH_KEY: string | undefined;
};

const COMETCHAT_CONSTANTS: CometChatConstants = {
  APP_ID: "252152741693d181",
  REGION: "eu",
  AUTH_KEY: "a86c94aaabaea27a1b023591e2e88751ad946f29",
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

// Create the builder
const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

// Attempt to initialize CometChat UIKit
const initResult = CometChatUIKit.init(UIKitSettings);

if (initResult) {
  // Since initResult is not undefined, we can safely call .then() and .catch()
  initResult
    .then(() => {
      console.log("Initialization completed successfully");
    })
    .catch((error: Error) => {
      console.log(error);
    });
} else {
  // Handle the case where init does not return a promise (i.e., returns undefined)
  console.error("Failed to initialize CometChat UIKit");
}

// let usersRequestBuilder = new CometChat.UsersRequestBuilder().setLimit(20).friendsOnly(true)

// Extend the UsersConfiguration type to make additional properties optional
interface ExtendedUsersConfiguration extends Partial<UsersConfiguration> {
  usersRequestBuilder: CometChat.UsersRequestBuilder;
}

const Chat: React.FC = () => {
  console.log("First Render");
  const [loggedInUser, setLoggedInUser] = useState<any>();
  // const [authToken, setAuthToken] = useState<string>();
  const isMobileView = true;

  useEffect(() => {
    CometChatUIKit.getLoggedinUser().then((user: any) => {
      if (!user) {
        //Login user
        CometChatUIKit.login("r4w7qefgkvux5viuodokkjv8whh2")
          .then((user: any) => {
            console.log("Login Successful:", { user });
            setLoggedInUser(user);
            //mount your app
          })
          .catch(console.log);
      } else {
        //mount your app
        console.log("User already logged in:", { user });
        setLoggedInUser(user);
      }
    });
  }, []);

  let limit = 30;
  // If undefined set roles to empty array
  let roles;
  roles = ["default"];

  const usersRequestBuilder = new CometChat.UsersRequestBuilder()
    .setLimit(limit)
    .setRoles(roles);
  // Use the extended type with type assertion
  const usersConfiguration: ExtendedUsersConfiguration = {
    usersRequestBuilder: usersRequestBuilder,
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <CometChatUsersWithMessages
        usersConfiguration={usersConfiguration as UsersConfiguration}
        isMobileView={isMobileView}
      />
    </div>
  );
};

export default Chat;
