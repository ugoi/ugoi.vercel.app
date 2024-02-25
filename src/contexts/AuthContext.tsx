// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth, provider } from "../firebase-config";
import Cookies from "universal-cookie";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseService2 } from "../services/FirebaseService2";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import { UIKitSettings } from "./cometchat-config";

interface AuthContextType {
  authToken: string | null;
  isAuth: boolean;
  isLoaded: boolean;
  cometChatUser: CometChat.User | null;
  setAuthToken: (token: string | null) => void;
  setIsAuth: (isAuthenticated: boolean) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cookies = new Cookies();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // Initially set to false
  const [cometChatUser, setCometChatUser] = useState<CometChat.User | null>(
    null
  );

  useEffect(() => {
    const token = cookies.get("auth-token");
    setAuthToken(token);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        // Optionally update authToken here if needed
      } else {
        CometChat.logout().then(
          () => {
            console.log("Logout completed successfully");
          },
          (error) => {
            console.log("Logout failed with exception:", { error });
          }
        );
        setIsAuth(false);
        setAuthToken(null); // Clear authToken if necessary
        cookies.remove("auth-token");
        setCometChatUser(null);
      }
      setIsLoaded(true); // indicate loading is done regardless of the auth state
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Starting AuthProvider useEffect isAuth: ", isAuth);
    if (isAuth == false) return;
    async function initializeFirebase() {
      try {
        console.log("Initializing FirebaseService2");
        console.log("FirebaseSettings");
        await FirebaseService2.init();
        console.log("FirebaseService2 initialized successfully");
        // You can now use FirebaseService2 instance in this component
      } catch (error) {
        console.error("Error initializing FirebaseService2:", error);
      }
    }

    const initializeCometChat = async () => {
      try {
        // Attempt to initialize CometChat UIKit
        console.log("Initializing CometChat UIKit");
        await CometChatUIKit.init(UIKitSettings);
        console.log("Initialization completed successfully");

        // Check for logged in user
        const user = await CometChatUIKit.getLoggedinUser();
        if (!user) {
          const authToken = await FirebaseService2.getAuthToken();
          // Login user if no user is logged in
          const loggedInUser = await CometChatUIKit.loginWithAuthToken(authToken);

          console.log("Login Successful:", { user: loggedInUser });
          setCometChatUser(loggedInUser);
        } else {
          // User is already logged in
          console.log("User already logged in:", { user });
          setCometChatUser(user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const initialize = async () => {
      await initializeFirebase();
      await initializeCometChat();
    };

    initialize();
  }, [isAuth]);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName });

      await FirebaseService2.completeUserProfile();
      const token = await FirebaseService2.getAuthToken();
      setAuthToken(token);
      cookies.set("auth-token", user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      cookies.set("auth-token", userCredential.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await FirebaseService2.completeUserProfile();
      cookies.set("auth-token", userCredential.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    authToken,
    isAuth,
    isLoaded,
    cometChatUser,
    setAuthToken,
    setIsAuth,
    setIsLoaded,
    signUp,
    signIn,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
