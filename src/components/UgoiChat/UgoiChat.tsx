import React, { useContext, useMemo } from "react";
import {
  CometChatPalette,
  CometChatTheme,
  CometChatThemeContext,
  CometChatUsersWithMessages,
  MessagesConfiguration,
  UsersConfiguration,
  WithMessagesStyle,
} from "@cometchat/chat-uikit-react"; //import the component in your App.js file
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useAuth } from "../../contexts/AuthContext";
import LogoutComponent from "../LogoutComponent/LogoutComponent";

const UgoiChat: React.FC = () => {
  const muiTheme = useTheme(); // Access the theme context
  const isMobileView = useMediaQuery(muiTheme.breakpoints.down("sm")); // Check if the current viewport matches a mobile view
  const { cometChatUser } = useAuth();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { theme } = useContext(CometChatThemeContext);

  const themeContext = useMemo(() => {
    if (prefersDarkMode) {
      return {
        theme: new CometChatTheme({
          palette: new CometChatPalette({
            mode: "dark",
            primary: {
              light: "#D422C2",
              dark: "#D422C2",
            },
            accent: {
              light: "#07E676",
              dark: "#B6F0D3",
            },
            accent50: {
              light: "#39f",
              dark: "#141414",
            },
            accent900: {
              light: "white",
              dark: "black",
            },
          }),
        }),
      };
    } else {
      return {
        theme,
      };
    }
  }, [prefersDarkMode, theme]);

  if (!cometChatUser)
    return (
      <div
        aria-live="polite"
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* @ts-ignore */}
        {/* <l-dot-spinner size="40" speed="0.9" color="white"></l-dot-spinner> */}
        Loading...
      </div>
    );

  let roles: string[];
  if (cometChatUser?.getRole() === undefined) {
    roles = ["none"];
  } else {
    roles = cometChatUser.getRole() === "admin" ? ["default"] : ["admin"];
  }
  const usersRequestBuilder = new CometChat.UsersRequestBuilder()
    .setLimit(30)
    .setRoles(roles);

  const usersConfiguration: UsersConfiguration = {
    showSectionHeader: false,
    usersRequestBuilder: usersRequestBuilder,
    menu: <LogoutComponent />,
  } as UsersConfiguration;

  const messagesConfiguration: MessagesConfiguration = {
    messageComposerConfiguration: {
      hideLiveReaction: true,
      emojiIconURL: "https://img.icons8.com/ios-filled/50/smiling.png",
      AIIconURL: "https://img.icons8.com/ios-glyphs/30/chatbot.png",
      messageComposerStyle: {
        textFont: "16px Arial",
      },
    },
    disableSoundForMessages: true,
    messageHeaderConfiguration: {
      hideBackButton: false,
    },
  } as MessagesConfiguration;

  const cwmStyle: WithMessagesStyle = {};

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
      }}
    >
      <CometChatThemeContext.Provider value={themeContext}>
        <CometChatUsersWithMessages
          usersWithMessagesStyle={cwmStyle}
          usersConfiguration={usersConfiguration}
          isMobileView={isMobileView}
          messagesConfiguration={messagesConfiguration}
        />
      </CometChatThemeContext.Provider>
    </div>
  );
};

export default UgoiChat;
