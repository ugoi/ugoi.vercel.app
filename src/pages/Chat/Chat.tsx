import { Navigate } from "react-router-dom";
import UgoiChat from "../../components/UgoiChat/UgoiChat";
import { useAuth } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";

const Chat: React.FC = () => {
  const { isAuth, isLoaded } = useAuth();

  if (!isLoaded)
    return (
      <div
        aria-live="polite"
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100%",
          color: "white",
        }}
      >
        {/* @ts-ignore */}
        {/* <l-dot-spinner size="40" speed="0.9" color="white"></l-dot-spinner> */}
        <CircularProgress />
      </div>
    );
  if (isAuth == false) return <Navigate to="/login" />;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <UgoiChat />
      </div>
    </div>
  );
};

export default Chat;
