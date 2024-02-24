import { render, screen } from "@testing-library/react";
import Portfolio from "./Portfolio";
import projects from "./projectsData"; // Adjust the path if needed
import { describe, expect, test } from "vitest";

describe("Portfolio Component", () => {
  test("Portfolio is rendered", () => {
    render(<Portfolio />);
  });

  describe("Project Cards", () => {
    projects.forEach((project, index) => {
      // New test to check if each card is rendered
      test(`Project card ${index} is rendered`, () => {
        render(<Portfolio />);
        const card = screen.getByTestId(`project-card-${index}`);
        expect(card).toBeTruthy();
      });

      if (project.githubLink) {
        test(`GitHub link for project ${index} points to the correct base URL`, () => {
          render(<Portfolio />);
          const githubLink = screen.getByTestId(`github-link-${index}`);
          const baseURL = new URL(project.githubLink).hostname; // Parse the base URL
          expect(githubLink.getAttribute("href")).toMatch(baseURL); // Check if href contains the base URL
        });
      }

      if (project.deployedLink) {
        test(`Deployed link for project ${index} points to the correct base URL`, () => {
          render(<Portfolio />);
          const deployedLink = screen.getByTestId(`deployed-link-${index}`);
          const baseURL = new URL(project.deployedLink).hostname; // Parse the base URL
          expect(deployedLink.getAttribute("href")).toMatch(baseURL); // Check if href contains the base URL
        });
      }
    });
  });
});
