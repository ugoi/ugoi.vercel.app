import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import GoogleButton from "react-google-button";
import { useAuth } from "../../contexts/AuthContext";
import { styled, keyframes } from "@mui/material/styles";

interface AuthProps {}

// FadeIn keyframe animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Centered container with full-screen gradient background and animation
const CenteredContainer = styled(Container)(() => ({
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
  animation: `${fadeIn} 1s ease-out`,
}));

// Glassmorphic card styling
const GlassCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[6],
  padding: theme.spacing(2),
}));

export const Auth: React.FC<AuthProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign Up and Sign In
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
    <CenteredContainer maxWidth={false} disableGutters>
      <GlassCard>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#fff", fontWeight: 700 }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          {isSignUp && (
            <TextField
              label="Username"
              type="text"
              fullWidth
              margin="normal"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1,
              background: "#ffd700",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { background: "#ffcc00" },
            }}
            onClick={isSignUp ? handleSignUp : handleSignIn}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
          <Box display="flex" justifyContent="center" mt={2}>
            <GoogleButton type="dark" onClick={handleSignInWithGoogle} />
          </Box>
        </CardContent>
      </GlassCard>
    </CenteredContainer>
  );
};
