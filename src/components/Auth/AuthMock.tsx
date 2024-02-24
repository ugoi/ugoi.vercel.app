import React, { useState } from "react";
import { auth, provider } from "../../firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Cookies from "universal-cookie";
import { Box, Button, TextField, Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { FirebaseService2Mock } from "../../services/FirebaseService2Mock";
import { useAuth } from "../../contexts/AuthContext";

const cookies = new Cookies();

interface AuthProps {}

export const AuthMock: React.FC<AuthProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between Sign Up and Sign In
  const [displayName, setDisplayName] = useState("");
  const { setAuthToken, setIsAuth } = useAuth();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: displayName,
      });

      await FirebaseService2Mock.completeUserProfile();

      const token = await FirebaseService2Mock.getAuthToken();
      setAuthToken(token);

      cookies.set("auth-token", user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
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

      FirebaseService2Mock.completeUserProfile();
      cookies.set("auth-token", userCredential.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className="auth" sx={{ width: 300, margin: "auto" }}>
      <Typography variant="h6">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
      {isSignUp && (
        <TextField
          label="Username"
          type="text"
          fullWidth
          margin="normal"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      )}
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        onClick={isSignUp ? handleSignUp : handleSignIn}
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>
      <Button fullWidth onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </Button>
      <Box display="flex" justifyContent="center" mt={2}>
        <GoogleButton type="dark" onClick={signInWithGoogle} />
      </Box>
    </Box>
  );
};
