import { Navigate } from "react-router-dom";
import UgoiChat from "../../components/UgoiChat/UgoiChat";
import { useAuth } from "../../contexts/AuthContext";
import "ldrs/dotSpinner";
import { g } from "vitest/dist/suite-ghspeorC.js";

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
        }}
      >
        {/* @ts-ignore */}
        <l-dot-spinner size="40" speed="0.9" color="white"></l-dot-spinner>
      </div>
    );
  if (isAuth == false) return <Navigate to="/login" />;
  return (
    <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <UgoiChat />
    </div>
  );
};

export default Chat;