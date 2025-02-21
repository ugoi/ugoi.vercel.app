import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, ReactNode } from "react";

// Add a type for the props to include children
type UgoiThemeProviderProps = {
  children?: ReactNode;
};

const UgoiThemeProvider: React.FC<UgoiThemeProviderProps> = ({ children }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default UgoiThemeProvider;
