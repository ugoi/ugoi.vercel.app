import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home2 from "./Home2";
import { describe, expect, test } from "vitest";

describe("<Home2 />", () => {
  test("Home2 is rendered", () => {
    render(<Home2 />);
  });

  test("LinkedIn button opens the correct link", () => {
    render(<Home2 />);

    // Get the LinkedIn button using its data-testid
    const linkedInButton = screen.getByTestId("linkedin-button");

    // Simulate a click on the button
    userEvent.click(linkedInButton);

    // Assert the link's href value
    expect(linkedInButton.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/stefan-dukic-68682b20b/"
    );
  });

  test("GitHub button opens the correct link", () => {
    render(<Home2 />);

    // Get the GitHub button using its data-testid
    const githubButton = screen.getByTestId("github-button");

    // Simulate a click on the button
    userEvent.click(githubButton);

    // Assert the link's href value
    expect(githubButton.getAttribute("href")).toBe("https://github.com/ugoi");
  });

  test("LinkedIn button has the correct base link", () => {
    render(<Home2 />);

    // Get the LinkedIn button using its data-testid
    const linkedInButton = screen.getByTestId("linkedin-button");

    // Assert the link's href value to check if it contains "linkedin.com"
    expect(linkedInButton.getAttribute("href")).toMatch(
      /https:\/\/www\.linkedin\.com\//
    );
  });

  test("GitHub button has the correct base link", () => {
    render(<Home2 />);

    // Get the GitHub button using its data-testid
    const githubButton = screen.getByTestId("github-button");

    // Assert the link's href value to check if it contains "github.com"
    expect(githubButton.getAttribute("href")).toMatch(
      /https:\/\/github\.com\//
    );
  });
});
