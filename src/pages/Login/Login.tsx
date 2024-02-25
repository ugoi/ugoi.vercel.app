import { Auth } from "../../components/Auth/Auth";
import { Box } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {
  const { isAuth, isLoaded } = useAuth();
  if (!isLoaded)
    return (
      <div
        data-testid="login-page"
        aria-live="polite"
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* @ts-ignore */}
        <l-dot-spinner size="40" speed="0.9" color="white"></l-dot-spinner>
      </div>
    );
  if (isAuth != false) return <Navigate to="/chat" />;
  return (
    <Box
      data-testid="login-page"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Auth />
    </Box>
  );
}

export default Login;
