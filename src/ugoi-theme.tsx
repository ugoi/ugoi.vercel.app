import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useMemo, ReactNode } from "react";

// Add a type for the props to include children
type UgoiThemeProviderProps = {
  children?: ReactNode; // This allows for any valid React node
};

const UgoiThemeProvider: React.FC<UgoiThemeProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      {children} {/* Render the children inside the ThemeProvider */}
    </ThemeProvider>
  );
};

export default UgoiThemeProvider;
