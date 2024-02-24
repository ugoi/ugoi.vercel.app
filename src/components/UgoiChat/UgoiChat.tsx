import React from "react";
import {
  CometChatUsersWithMessages,
  MessagesConfiguration,
  UsersConfiguration,
} from "@cometchat/chat-uikit-react"; //import the component in your App.js file
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import { CometChat } from "@cometchat/chat-sdk-javascript";

const UgoiChat: React.FC = () => {
  const theme = useTheme(); // Access the theme context
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm")); // Check if the current viewport matches a mobile view

  const usersRequestBuilder = new CometChat.UsersRequestBuilder()
    .setLimit(30)
    .setRoles(["default"]);

  const usersConfiguration: UsersConfiguration = {
    usersRequestBuilder: usersRequestBuilder,
  } as UsersConfiguration;

  const messagesConfiguration: MessagesConfiguration = {
    messageHeaderConfiguration: {
      hideBackButton: false,
    },
  } as MessagesConfiguration;

  return (
    <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <LogoutComponent />
      <CometChatUsersWithMessages
        usersConfiguration={usersConfiguration}
        isMobileView={isMobileView}
        messagesConfiguration={messagesConfiguration}
      />
    </div>
  );
};

export default UgoiChat;
