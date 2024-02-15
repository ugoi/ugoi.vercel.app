import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { useTheme } from "@mui/material";
import UgoiThemeProvider from "./ugoi-theme";

const ThemedComponent = () => {
  const theme = useTheme();
  const style = {
    color: theme.palette.mode === "dark" ? "white" : "black",
    padding: "20px",
    border: `1px solid ${theme.palette.mode === "dark" ? "white" : "black"}`,
  };

  return <div style={style}>This text color changes with theme mode.</div>;
};

describe("UgoiThemeProvider", () => {
  it("applies light theme and affects child components", async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query !== "(prefers-color-scheme: dark)",
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    const { container } = render(
      <UgoiThemeProvider>
        <ThemedComponent />
      </UgoiThemeProvider>
    );

    const themedText = container.querySelector("div");
    if (!themedText) throw new Error("No div found");

    // Using getComputedStyle to check the actual applied style
    const style = window.getComputedStyle(themedText);
    expect(style.color).toBe("rgb(0, 0, 0)"); // Expecting the computed style color value
  });

  it("applies dark theme and affects child components", async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    const { container } = render(
      <UgoiThemeProvider>
        <ThemedComponent />
      </UgoiThemeProvider>
    );

    const themedText = container.querySelector("div");
    if (!themedText) throw new Error("No div found");

    // Using getComputedStyle to check the actual applied style
    const style = window.getComputedStyle(themedText);
    expect(style.color).toBe("rgb(255, 255, 255)"); // Expecting the computed style color value
  });
});
