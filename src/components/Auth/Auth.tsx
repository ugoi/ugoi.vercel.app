import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { useAuth } from "../../contexts/AuthContext";

interface AuthProps {}

export const Auth: React.FC<AuthProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between Sign Up and Sign In
  const [displayName, setDisplayName] = useState("");
  const { signUp, signIn, signInWithGoogle } = useAuth();

  const handleSignUp = async () => {
    await signUp(email, password, displayName);
  };

  const handleSignIn = async () => {
    signIn(email, password);
  };

  const handleSignInWithGoogle = async () => {
    signInWithGoogle();
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
        <GoogleButton type="dark" onClick={handleSignInWithGoogle} />
      </Box>
    </Box>
  );
};
