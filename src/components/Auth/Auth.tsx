import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { styled, keyframes } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";

interface AuthProps {}

// Enhanced animations
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
    filter: blur(10px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
    filter: blur(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const CenteredContainer = styled(Container)(() => ({
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
  animation: `${fadeIn} 1s ease-out`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "200%",
    height: "200%",
    transform: "translate(-50%, -50%) rotate(45deg)",
    background:
      "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
    animation: `${shimmer} 5s infinite linear`,
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: theme.spacing(3),
  position: "relative",
  overflow: "visible",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "16px",
    padding: "2px",
    background:
      "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffd700",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-focused": {
      color: "#ffd700",
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "12px",
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "1.1rem",
  transition: "all 0.3s ease",
  background: "linear-gradient(45deg, #ffd700, #ffcc00)",
  color: "#000",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(255, 215, 0, 0.3)",
    background: "linear-gradient(45deg, #ffcc00, #ffd700)",
  },
}));

const TextButton = styled(Button)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#fff",
    background: "rgba(255, 255, 255, 0.1)",
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "12px",
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "1.1rem",
  width: "100%",
  transition: "all 0.3s ease",
  background: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    transition: "all 0.3s ease",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    "& .MuiSvgIcon-root": {
      transform: "scale(1.1)",
      color: "#ffd700",
    },
  },
}));

export const Auth: React.FC<AuthProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CenteredContainer maxWidth={false} disableGutters>
      <GlassCard>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 4,
              background: "linear-gradient(45deg, #fff, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </Typography>
          {isSignUp && (
            <StyledTextField
              label="Username"
              type="text"
              fullWidth
              margin="normal"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}
          <StyledTextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ActionButton
            fullWidth
            sx={{ mt: 3 }}
            onClick={isSignUp ? handleSignUp : handleSignIn}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </ActionButton>
          <TextButton
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </TextButton>
          <Box
            sx={{
              position: "relative",
              my: 3,
              textAlign: "center",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                width: "40%",
                height: "1px",
                background: "rgba(255, 255, 255, 0.1)",
              },
              "&::before": { left: 0 },
              "&::after": { right: 0 },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                display: "inline-block",
                px: 2,
              }}
            >
              or
            </Typography>
          </Box>
          <GoogleButton
            onClick={handleSignInWithGoogle}
            aria-label="Sign in with Google"
          >
            <GoogleIcon />
            Continue with Google
          </GoogleButton>
        </CardContent>
      </GlassCard>
    </CenteredContainer>
  );
};
